'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, MoveUp, MoveDown } from 'lucide-react';
import { getPageSections, addSection, updateSection, deleteSection } from '@/lib/firestore';
import { toast } from 'sonner';

export default function SectionsManager() {
  const [selectedPage, setSelectedPage] = useState('about');
  const [sections, setSections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: 'text',
    title: '',
    content: '',
    image: '',
    imagePosition: 'right',
    backgroundColor: 'bg-white',
    videoUrl: '',
    order: 0,
    features: [],
    stats: []
  });

  useEffect(() => {
    loadSections();
  }, [selectedPage]);

  const loadSections = async () => {
    const data = await getPageSections(selectedPage);
    setSections(data);
  };

  const handleSave = async () => {
    if (!formData.title && !formData.content) {
      toast.error('Please add a title or content.');
      return;
    }
    
    setIsLoading(true);
    toast.loading('Saving section...', { id: 'section' });
    
    try {
      const sectionData = {
        ...formData,
        pageId: selectedPage,
        order: formData.order || sections.length
      };

      if (editingSection) {
        await updateSection(editingSection.id, sectionData);
      } else {
        await addSection(sectionData);
      }
      
      await loadSections();
      resetForm();
      setIsDialogOpen(false);
      toast.success('Section saved successfully!', { id: 'section' });
    } catch (error) {
      console.error('Section save error:', error);
      toast.error('Error saving section', { id: 'section' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this section?')) {
      toast.loading('Deleting section...', { id: 'delete-section' });
      try {
        await deleteSection(id);
        await loadSections();
        toast.success('Section deleted successfully!', { id: 'delete-section' });
      } catch (error) {
        toast.error('Error deleting section', { id: 'delete-section' });
      }
    }
  };

  const resetForm = () => {
    setFormData({
      type: 'text',
      title: '',
      content: '',
      image: '',
      imagePosition: 'right',
      backgroundColor: 'bg-white',
      videoUrl: '',
      order: 0,
      features: [],
      stats: []
    });
    setEditingSection(null);
  };

  const startEdit = (section: any) => {
    setEditingSection(section);
    setFormData(section);
    setIsDialogOpen(true);
  };

  const moveSection = async (index: number, direction: 'up' | 'down') => {
    const newSections = [...sections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex < 0 || targetIndex >= newSections.length) return;
    
    [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]];
    
    // Update order in database
    for (let i = 0; i < newSections.length; i++) {
      await updateSection(newSections[i].id, { ...newSections[i], order: i });
    }
    
    await loadSections();
    toast.success('Section order updated!');
  };

  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, { icon: '💪', title: '', description: '' }]
    });
  };

  const updateFeature = (index: number, field: string, value: string) => {
    const updated = [...formData.features];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, features: updated });
  };

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index)
    });
  };

  const addStat = () => {
    setFormData({
      ...formData,
      stats: [...formData.stats, { number: '', label: '' }]
    });
  };

  const updateStat = (index: number, field: string, value: string) => {
    const updated = [...formData.stats];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, stats: updated });
  };

  const removeStat = (index: number) => {
    setFormData({
      ...formData,
      stats: formData.stats.filter((_, i) => i !== index)
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dynamic Sections Manager</CardTitle>
        <div className="flex space-x-4">
          <Select value={selectedPage} onValueChange={setSelectedPage}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="about">About Page</SelectItem>
              <SelectItem value="why">Why Page</SelectItem>
              <SelectItem value="home">Home Page (Additional)</SelectItem>
            </SelectContent>
          </Select>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                onClick={() => {
                  resetForm();
                  setIsDialogOpen(true);
                }}
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Section
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingSection ? 'Edit Section' : `Add New Section to ${selectedPage}`}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Section Type
                    </label>
                    <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">Text Only</SelectItem>
                        <SelectItem value="image-text">Image + Text</SelectItem>
                        <SelectItem value="features">Features Grid</SelectItem>
                        <SelectItem value="stats">Statistics</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                        <SelectItem value="testimonials">Testimonials</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Background Style
                    </label>
                    <Select value={formData.backgroundColor} onValueChange={(value) => setFormData({ ...formData, backgroundColor: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bg-white">White</SelectItem>
                        <SelectItem value="bg-gray-50">Light Gray</SelectItem>
                        <SelectItem value="bg-gray-900 text-white">Dark</SelectItem>
                        <SelectItem value="bg-gradient-to-r from-orange-500 to-red-600 text-white">Orange Gradient</SelectItem>
                        <SelectItem value="bg-gradient-to-r from-blue-500 to-purple-600 text-white">Blue Gradient</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Section Title
                  </label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter section title"
                  />
                </div>

                {(formData.type === 'text' || formData.type === 'image-text') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Content
                    </label>
                    <Textarea
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      rows={6}
                      placeholder="Enter your content here..."
                    />
                  </div>
                )}

                {formData.type === 'image-text' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Image URL
                      </label>
                      <Input
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        placeholder="https://images.pexels.com/..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Image Position
                      </label>
                      <Select value={formData.imagePosition} onValueChange={(value) => setFormData({ ...formData, imagePosition: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="left">Left</SelectItem>
                          <SelectItem value="right">Right</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                {formData.type === 'video' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Video URL (YouTube Embed)
                    </label>
                    <Input
                      value={formData.videoUrl || ''}
                      onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                      placeholder="https://www.youtube.com/embed/..."
                    />
                  </div>
                )}

                {formData.type === 'features' && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Features
                      </label>
                      <Button onClick={addFeature} size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Feature
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      {formData.features.map((feature: any, index: number) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <Input
                              placeholder="Icon (emoji)"
                              value={feature.icon}
                              onChange={(e) => updateFeature(index, 'icon', e.target.value)}
                            />
                            <Input
                              placeholder="Feature title"
                              value={feature.title}
                              onChange={(e) => updateFeature(index, 'title', e.target.value)}
                            />
                          </div>
                          <div className="flex space-x-2">
                            <Textarea
                              placeholder="Feature description"
                              value={feature.description}
                              onChange={(e) => updateFeature(index, 'description', e.target.value)}
                              className="flex-1"
                              rows={2}
                            />
                            <Button 
                              onClick={() => removeFeature(index)}
                              size="sm"
                              variant="outline"
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {formData.type === 'stats' && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Statistics
                      </label>
                      <Button onClick={addStat} size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Stat
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      {formData.stats.map((stat: any, index: number) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Input
                              placeholder="Number"
                              value={stat.number}
                              onChange={(e) => updateStat(index, 'number', e.target.value)}
                            />
                            <Input
                              placeholder="Label"
                              value={stat.label}
                              onChange={(e) => updateStat(index, 'label', e.target.value)}
                            />
                            <div className="flex space-x-2">
                              <Input
                                placeholder="Suffix (optional)"
                                value={stat.suffix || ''}
                                onChange={(e) => updateStat(index, 'suffix', e.target.value)}
                                className="flex-1"
                              />
                              <Button 
                                onClick={() => removeStat(index)}
                                size="sm"
                                variant="outline"
                                className="text-red-600"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex space-x-4">
                  <Button 
                    onClick={handleSave} 
                    disabled={isLoading}
                    className="btn-theme-primary"
                  >
                    {isLoading ? 'Saving...' : 'Save Section'}
                  </Button>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sections.map((section: any, index: number) => (
            <div key={section.id} className="flex justify-between items-center p-4 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                    {section.type}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                    Order: {section.order}
                  </span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                    {selectedPage}
                  </span>
                </div>
                <h3 className="font-semibold">{section.title}</h3>
                {section.content && (
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{section.content}</p>
                )}
                {section.features && section.features.length > 0 && (
                  <p className="text-sm text-blue-600 mt-1">{section.features.length} features</p>
                )}
                {section.stats && section.stats.length > 0 && (
                  <p className="text-sm text-purple-600 mt-1">{section.stats.length} statistics</p>
                )}
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => moveSection(index, 'up')}
                  disabled={index === 0}
                >
                  <MoveUp className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => moveSection(index, 'down')}
                  disabled={index === sections.length - 1}
                >
                  <MoveDown className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => startEdit(section)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDelete(section.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          
          {sections.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No sections yet for {selectedPage}. Add your first section to get started!
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}