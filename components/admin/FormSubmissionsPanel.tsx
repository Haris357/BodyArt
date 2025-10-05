'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getFormSubmissions, updateFormSubmissionStatus } from '@/lib/firestore';
import { toast } from 'sonner';

export default function FormSubmissionsPanel() {
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    const data = await getFormSubmissions();
    setSubmissions(data);
  };

  const updateStatus = async (id: string, status: string) => {
    setIsLoading(true);
    toast.loading('Updating status...', { id: 'form-status' });
    try {
      await updateFormSubmissionStatus(id, status);
      await loadSubmissions();
      toast.success('Status updated successfully!', { id: 'form-status' });
    } catch (error) {
      toast.error('Error updating status', { id: 'form-status' });
    } finally {
      setIsLoading(false);
    }
  };

  const contactSubmissions = submissions.filter((sub: any) => sub.type === 'contact');
  const membershipSubmissions = submissions.filter((sub: any) => sub.type === 'membership');

  const formatDate = (date: any) => {
    if (!date) return 'N/A';
    const d = date.toDate ? date.toDate() : new Date(date);
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      new: 'bg-blue-100 text-blue-800',
      contacted: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800'
    };
    return colors[status as keyof typeof colors] || colors.new;
  };

  const SubmissionCard = ({ submission }: { submission: any }) => (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-semibold">{submission.name}</h3>
            <p className="text-sm text-gray-600">{submission.email}</p>
            {submission.phone && (
              <p className="text-sm text-gray-600">{submission.phone}</p>
            )}
          </div>
          <Badge className={getStatusBadge(submission.status)}>
            {submission.status || 'new'}
          </Badge>
        </div>
        
        {submission.goal && (
          <p className="text-sm mb-2"><strong>Goal:</strong> {submission.goal}</p>
        )}
        
        {submission.message && (
          <p className="text-sm mb-3"><strong>Message:</strong> {submission.message}</p>
        )}
        
        {submission.notes && (
          <p className="text-sm mb-3"><strong>Notes:</strong> {submission.notes}</p>
        )}
        
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">
            {formatDate(submission.createdAt)}
          </span>
          <div className="space-x-2">
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => updateStatus(submission.id, 'contacted')}
              disabled={isLoading}
            >
              Mark Contacted
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => updateStatus(submission.id, 'completed')}
              disabled={isLoading}
            >
              Mark Completed
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Form Submissions</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="membership" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="membership">
              Membership Applications ({membershipSubmissions.length})
            </TabsTrigger>
            <TabsTrigger value="contact">
              Contact Messages ({contactSubmissions.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="membership">
            <div className="space-y-4">
              {membershipSubmissions.length > 0 ? (
                membershipSubmissions.map((submission: any) => (
                  <SubmissionCard key={submission.id} submission={submission} />
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No membership applications yet.
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="contact">
            <div className="space-y-4">
              {contactSubmissions.length > 0 ? (
                contactSubmissions.map((submission: any) => (
                  <SubmissionCard key={submission.id} submission={submission} />
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No contact messages yet.
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}