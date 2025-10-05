'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Download, 
  Printer, 
  Save, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  FileDown,
  Image as ImageIcon,
  Bold,
  Italic,
  Underline,
  List,
  AlignLeft,
  AlignCenter,
  AlignRight
} from 'lucide-react';
import { getDocuments, addDocument, updateDocument, deleteDocument } from '@/lib/firestore';
import { toast } from 'sonner';
import dynamic from 'next/dynamic';

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

export default function DocumentEditor() {
  const [documents, setDocuments] = useState([]);
  const [currentDoc, setCurrentDoc] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'general'
  });
  const editorRef = useRef(null);

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      const data = await getDocuments();
      setDocuments(data);
    } catch (error) {
      console.error('Error loading documents:', error);
      toast.error('Error loading documents');
    }
  };

  const handleSave = async () => {
    if (!formData.title || !formData.content) {
      toast.error('Please add a title and content.');
      return;
    }
    
    setIsLoading(true);
    toast.loading('Saving document...', { id: 'document' });
    
    try {
      const docData = {
        ...formData,
        lastModified: new Date(),
        wordCount: getWordCount(formData.content)
      };

      if (currentDoc) {
        await updateDocument(currentDoc.id, docData);
      } else {
        await addDocument(docData);
      }
      
      await loadDocuments();
      resetForm();
      setIsDialogOpen(false);
      toast.success('Document saved successfully!', { id: 'document' });
    } catch (error) {
      console.error('Document save error:', error);
      toast.error('Error saving document', { id: 'document' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this document?')) {
      toast.loading('Deleting document...', { id: 'delete-doc' });
      try {
        await deleteDocument(id);
        await loadDocuments();
        toast.success('Document deleted successfully!', { id: 'delete-doc' });
      } catch (error) {
        toast.error('Error deleting document', { id: 'delete-doc' });
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      category: 'general'
    });
    setCurrentDoc(null);
    setIsEditing(false);
  };

  const startEdit = (doc: any) => {
    setCurrentDoc(doc);
    setFormData({
      title: doc.title,
      content: doc.content,
      category: doc.category || 'general'
    });
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const getWordCount = (content: string) => {
    const text = content.replace(/<[^>]*>/g, '');
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const exportToPDF = async (doc: any) => {
    toast.loading('Generating PDF...', { id: 'pdf-export' });
    try {
      const jsPDF = (await import('jspdf')).default;
      const html2canvas = (await import('html2canvas')).default;
      
      // Create a temporary div with the document content
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = `
        <div style="padding: 40px; font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto;">
          <h1 style="color: #1f2937; margin-bottom: 20px; font-size: 28px;">${doc.title}</h1>
          <div style="color: #4b5563; line-height: 1.6; font-size: 14px;">${doc.content}</div>
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #9ca3af; font-size: 12px;">
            Generated on ${new Date().toLocaleDateString()} | Word Count: ${doc.wordCount || 0}
          </div>
        </div>
      `;
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.top = '0';
      tempDiv.style.width = '800px';
      tempDiv.style.backgroundColor = 'white';
      document.body.appendChild(tempDiv);

      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });
      
      document.body.removeChild(tempDiv);

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${doc.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`);
      toast.success('PDF downloaded successfully!', { id: 'pdf-export' });
    } catch (error) {
      console.error('PDF export error:', error);
      toast.error('Error generating PDF', { id: 'pdf-export' });
    }
  };

  const exportToWord = async (doc: any) => {
    toast.loading('Generating Word document...', { id: 'word-export' });
    try {
      const { saveAs } = await import('file-saver');
      
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>${doc.title}</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; margin: 40px; }
            h1 { color: #1f2937; margin-bottom: 20px; }
            .content { color: #4b5563; }
            .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #9ca3af; font-size: 12px; }
          </style>
        </head>
        <body>
          <h1>${doc.title}</h1>
          <div class="content">${doc.content}</div>
          <div class="footer">
            Generated on ${new Date().toLocaleDateString()} | Word Count: ${doc.wordCount || 0}
          </div>
        </body>
        </html>
      `;
      
      const blob = new Blob([htmlContent], { type: 'application/msword' });
      saveAs(blob, `${doc.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.doc`);
      toast.success('Word document downloaded successfully!', { id: 'word-export' });
    } catch (error) {
      console.error('Word export error:', error);
      toast.error('Error generating Word document', { id: 'word-export' });
    }
  };

  const printDocument = (doc: any) => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Print: ${doc.title}</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; margin: 40px; }
            h1 { color: #1f2937; margin-bottom: 20px; }
            .content { color: #4b5563; }
            .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #9ca3af; font-size: 12px; }
            @media print {
              body { margin: 20px; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <h1>${doc.title}</h1>
          <div class="content">${doc.content}</div>
          <div class="footer">
            Generated on ${new Date().toLocaleDateString()} | Word Count: ${doc.wordCount || 0}
          </div>
        </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      ['blockquote', 'code-block'],
      ['link', 'image', 'video'],
      ['clean']
    ]
  };

  const quillFormats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
    'color', 'background',
    'align', 'code-block'
  ];

  const formatDate = (date: any) => {
    if (!date) return 'N/A';
    const d = date.toDate ? date.toDate() : new Date(date);
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'business': return 'bg-blue-100 text-blue-800';
      case 'personal': return 'bg-green-100 text-green-800';
      case 'marketing': return 'bg-purple-100 text-purple-800';
      case 'legal': return 'bg-red-100 text-red-800';
      case 'notes': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Document Editor */}
      <div className="lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Document Editor</span>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    onClick={() => {
                      resetForm();
                      setIsDialogOpen(true);
                    }}
                    className="btn-theme-primary"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    New Document
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
                  <DialogHeader>
                    <DialogTitle>
                      {currentDoc ? 'Edit Document' : 'Create New Document'}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Document Title
                        </label>
                        <Input
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          placeholder="Enter document title"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Category
                        </label>
                        <select 
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                          <option value="general">General</option>
                          <option value="business">Business</option>
                          <option value="personal">Personal</option>
                          <option value="marketing">Marketing</option>
                          <option value="legal">Legal</option>
                          <option value="notes">Notes</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Document Content
                      </label>
                      <div className="border border-gray-300 rounded-lg overflow-hidden">
                        <ReactQuill
                          theme="snow"
                          value={formData.content}
                          onChange={(content) => setFormData({ ...formData, content })}
                          modules={quillModules}
                          formats={quillFormats}
                          style={{ height: '400px' }}
                          placeholder="Start writing your document..."
                        />
                      </div>
                    </div>

                    <div className="flex space-x-4 pt-12">
                      <Button 
                        onClick={handleSave} 
                        disabled={isLoading}
                        className="btn-theme-primary"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        {isLoading ? 'Saving...' : 'Save Document'}
                      </Button>
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Toolbar */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex flex-wrap gap-2 items-center">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <FileText className="h-4 w-4" />
                  <span>Rich Text Editor with:</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  <Bold className="h-3 w-3 mr-1" />
                  Formatting
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <ImageIcon className="h-3 w-3 mr-1" />
                  Images
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <List className="h-3 w-3 mr-1" />
                  Lists
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <AlignCenter className="h-3 w-3 mr-1" />
                  Alignment
                </Badge>
              </div>
            </div>

            {/* Document Preview/Editor Area */}
            {currentDoc ? (
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{currentDoc.title}</h2>
                    <div className="flex items-center space-x-4 mt-2">
                      <Badge className={getCategoryColor(currentDoc.category)}>
                        {currentDoc.category}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {currentDoc.wordCount || 0} words
                      </span>
                      <span className="text-sm text-gray-500">
                        Last modified: {formatDate(currentDoc.lastModified)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      onClick={() => startEdit(currentDoc)}
                      size="sm"
                      variant="outline"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button 
                      onClick={() => printDocument(currentDoc)}
                      size="sm"
                      variant="outline"
                    >
                      <Printer className="h-4 w-4 mr-2" />
                      Print
                    </Button>
                    <Button 
                      onClick={() => exportToPDF(currentDoc)}
                      size="sm"
                      variant="outline"
                    >
                      <FileDown className="h-4 w-4 mr-2" />
                      PDF
                    </Button>
                    <Button 
                      onClick={() => exportToWord(currentDoc)}
                      size="sm"
                      variant="outline"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      DOC
                    </Button>
                  </div>
                </div>

                <div className="prose max-w-none">
                  <div 
                    className="bg-white p-8 rounded-lg border border-gray-200 min-h-96"
                    dangerouslySetInnerHTML={{ __html: currentDoc.content }}
                  />
                </div>
              </div>
            ) : (
              <div className="text-center py-16 text-gray-500">
                <FileText className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Document Selected</h3>
                <p className="text-gray-600 mb-6">
                  Select a document from the sidebar or create a new one to start editing.
                </p>
                <Button 
                  onClick={() => {
                    resetForm();
                    setIsDialogOpen(true);
                  }}
                  className="btn-theme-primary"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Document
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Document History Sidebar */}
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Document History</CardTitle>
            <p className="text-sm text-gray-600">
              {documents.length} document{documents.length !== 1 ? 's' : ''} saved
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="max-h-96 overflow-y-auto space-y-3">
              {documents.map((doc: any) => (
                <div 
                  key={doc.id} 
                  className={`p-3 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                    currentDoc?.id === doc.id ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setCurrentDoc(doc)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900 text-sm line-clamp-2">
                      {doc.title}
                    </h4>
                    <div className="flex space-x-1">
                      <Button 
                        onClick={(e) => {
                          e.stopPropagation();
                          startEdit(doc);
                        }}
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(doc.id);
                        }}
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Badge className={`${getCategoryColor(doc.category)} text-xs`}>
                      {doc.category}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {doc.wordCount || 0} words
                    </span>
                  </div>
                  
                  <div className="text-xs text-gray-500 mt-2">
                    {formatDate(doc.lastModified)}
                  </div>
                </div>
              ))}
            </div>
            
            {documents.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p className="text-sm">No documents yet.</p>
                <p className="text-xs">Create your first document!</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Export Options */}
        {currentDoc && (
          <Card className="mt-4 md:mt-6">
            <CardHeader>
              <CardTitle className="text-sm md:text-lg">Export Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 md:space-y-3">
              <Button 
                onClick={() => exportToPDF(currentDoc)}
                className="w-full justify-start text-xs md:text-sm"
                variant="outline"
              >
                <FileDown className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Download as PDF</span>
                <span className="sm:hidden">PDF</span>
              </Button>
              
              <Button 
                onClick={() => exportToWord(currentDoc)}
                className="w-full justify-start text-xs md:text-sm"
                variant="outline"
              >
                <Download className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Download as DOC</span>
                <span className="sm:hidden">DOC</span>
              </Button>
              
              <Button 
                onClick={() => printDocument(currentDoc)}
                className="w-full justify-start text-xs md:text-sm"
                variant="outline"
              >
                <Printer className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Print Document</span>
                <span className="sm:hidden">Print</span>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}