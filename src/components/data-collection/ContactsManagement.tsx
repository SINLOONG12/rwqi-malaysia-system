
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Users, User, Send, Mail, Upload, File, Calendar } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface Contact {
  id: string;
  name: string;
  email: string;
  organization: string;
  role: string;
  type: "cleanup" | "government" | "publisher" | "public";
}

const ContactsManagement: React.FC = () => {
  const { toast } = useToast();
  const [contacts, setContacts] = useState<Contact[]>([
    { id: "1", name: "Amir bin Hassan", email: "amir@cleanup.org.my", organization: "River Guardians", role: "Team Lead", type: "cleanup" },
    { id: "2", name: "Dr. Siti Aminah", email: "siti@doe.gov.my", organization: "Dept. of Environment", role: "Director", type: "government" },
    { id: "3", name: "Lee Wei Ling", email: "weiling@rivermedia.my", organization: "River Media", role: "Editor", type: "publisher" },
    { id: "4", name: "Raj Kumar", email: "raj@cleanup.org.my", organization: "River Guardians", role: "Field Manager", type: "cleanup" },
    { id: "5", name: "Tan Mei Hua", email: "tanmh@water.gov.my", organization: "Water Commission", role: "Analyst", type: "government" },
  ]);
  
  const [newContact, setNewContact] = useState<Omit<Contact, 'id'>>({
    name: "",
    email: "",
    organization: "",
    role: "",
    type: "cleanup"
  });
  
  const [filter, setFilter] = useState("all");
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [emailData, setEmailData] = useState({
    to: "",
    subject: "",
    message: "",
    files: null as File[] | null
  });
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [scheduleData, setScheduleData] = useState({
    to: "",
    date: "",
    location: "",
    details: "",
    files: null as File[] | null
  });
  
  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newContact.name || !newContact.email) {
      toast({
        title: "Missing Information",
        description: "Please provide at least a name and email.",
        variant: "destructive",
      });
      return;
    }
    
    const contact: Contact = {
      ...newContact,
      id: Date.now().toString()
    };
    
    setContacts([...contacts, contact]);
    
    setNewContact({
      name: "",
      email: "",
      organization: "",
      role: "",
      type: "cleanup"
    });
    
    toast({
      title: "Contact Added",
      description: `${contact.name} has been added to your contacts.`,
    });
  };
  
  const handleSendSchedule = (contact: Contact) => {
    setScheduleData({
      ...scheduleData,
      to: contact.email
    });
    setShowScheduleDialog(true);
  };
  
  const handleSubmitSchedule = () => {
    toast({
      title: "Schedule Sent",
      description: `Cleanup schedule has been sent to ${scheduleData.to}.`,
    });
    setShowScheduleDialog(false);
    setScheduleData({
      to: "",
      date: "",
      location: "",
      details: "",
      files: null
    });
  };

  const handleContact = (contact: Contact) => {
    setEmailData({
      ...emailData,
      to: contact.email
    });
    setShowEmailDialog(true);
  };
  
  const handleSubmitEmail = () => {
    toast({
      title: "Email Sent",
      description: `Your message has been sent to ${emailData.to}.`,
    });
    setShowEmailDialog(false);
    setEmailData({
      to: "",
      subject: "",
      message: "",
      files: null
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'email' | 'schedule') => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      if (type === 'email') {
        setEmailData({ ...emailData, files: filesArray });
      } else {
        setScheduleData({ ...scheduleData, files: filesArray });
      }
    }
  };
  
  const filteredContacts = filter === "all" 
    ? contacts 
    : contacts.filter(contact => contact.type === filter);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2 border-blue-100 dark:border-blue-900/50">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-xl font-bold text-blue-700 dark:text-blue-400">
              <Users className="h-5 w-5 inline mr-2" />
              Contact Management
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Manage cleanup teams and government agency contacts
            </CardDescription>
          </div>
          <div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter contacts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Contacts</SelectItem>
                <SelectItem value="cleanup">Cleanup Teams</SelectItem>
                <SelectItem value="government">Government</SelectItem>
                <SelectItem value="publisher">Publishers</SelectItem>
                <SelectItem value="public">Public</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] w-full pr-4">
            <div className="space-y-4">
              {filteredContacts.map(contact => (
                <div key={contact.id} className="border rounded-lg p-4 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 rounded-full p-2">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{contact.name}</h4>
                      <p className="text-sm text-muted-foreground">{contact.email}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">{contact.organization}</Badge>
                        <Badge variant="secondary">{contact.role}</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {contact.type === "cleanup" && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex items-center gap-2"
                        onClick={() => handleSendSchedule(contact)}
                      >
                        <Calendar className="h-4 w-4" />
                        Send Schedule
                      </Button>
                    )}
                    <Button 
                      size="sm" 
                      className="flex items-center gap-2"
                      onClick={() => handleContact(contact)}
                    >
                      <Mail className="h-4 w-4" />
                      Contact
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Add New Contact</CardTitle>
          <CardDescription>
            Add a new team member or agency contact
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddContact} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                value={newContact.name} 
                onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                placeholder="Enter full name"
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={newContact.email} 
                onChange={(e) => setNewContact({...newContact, email: e.target.value})}
                placeholder="Enter email address"
              />
            </div>
            
            <div>
              <Label htmlFor="organization">Organization</Label>
              <Input 
                id="organization" 
                value={newContact.organization} 
                onChange={(e) => setNewContact({...newContact, organization: e.target.value})}
                placeholder="Enter organization"
              />
            </div>
            
            <div>
              <Label htmlFor="role">Role</Label>
              <Input 
                id="role" 
                value={newContact.role} 
                onChange={(e) => setNewContact({...newContact, role: e.target.value})}
                placeholder="Enter role or position"
              />
            </div>
            
            <div>
              <Label htmlFor="type">Contact Type</Label>
              <Select 
                value={newContact.type} 
                onValueChange={(value) => 
                  setNewContact({...newContact, type: value as Contact['type']})
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cleanup">Cleanup Team</SelectItem>
                  <SelectItem value="government">Government Agency</SelectItem>
                  <SelectItem value="publisher">Publisher</SelectItem>
                  <SelectItem value="public">Public</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button type="submit" className="w-full">Add Contact</Button>
          </form>
        </CardContent>
      </Card>

      {/* Email Composition Dialog */}
      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Send Email</DialogTitle>
            <DialogDescription>
              Compose your email message below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="email-to">To</Label>
              <Input 
                id="email-to" 
                value={emailData.to} 
                onChange={(e) => setEmailData({...emailData, to: e.target.value})}
                placeholder="recipient@gmail.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email-subject">Subject</Label>
              <Input 
                id="email-subject" 
                value={emailData.subject} 
                onChange={(e) => setEmailData({...emailData, subject: e.target.value})}
                placeholder="Email subject"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email-message">Message</Label>
              <Textarea 
                id="email-message" 
                value={emailData.message} 
                onChange={(e) => setEmailData({...emailData, message: e.target.value})}
                placeholder="Type your message here..."
                className="min-h-[120px]"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email-files">Attachments</Label>
              <div className="flex items-center gap-2">
                <Input 
                  id="email-files" 
                  type="file" 
                  className="hidden"
                  onChange={(e) => handleFileChange(e, 'email')}
                  multiple
                />
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => document.getElementById('email-files')?.click()}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Upload className="h-4 w-4" />
                  Browse Files
                </Button>
              </div>
              {emailData.files && emailData.files.length > 0 && (
                <div className="text-sm text-muted-foreground mt-1">
                  {emailData.files.length} file(s) selected
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEmailDialog(false)}>Cancel</Button>
            <Button type="submit" onClick={handleSubmitEmail}>Send Email</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Schedule Dialog */}
      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Send Cleanup Schedule</DialogTitle>
            <DialogDescription>
              Provide schedule details and upload any relevant files.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="schedule-to">Recipient</Label>
              <Input 
                id="schedule-to" 
                value={scheduleData.to} 
                onChange={(e) => setScheduleData({...scheduleData, to: e.target.value})}
                placeholder="recipient@cleanup.org"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="schedule-date">Scheduled Date</Label>
              <Input 
                id="schedule-date" 
                type="date"
                value={scheduleData.date} 
                onChange={(e) => setScheduleData({...scheduleData, date: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="schedule-location">Location</Label>
              <Input 
                id="schedule-location" 
                value={scheduleData.location} 
                onChange={(e) => setScheduleData({...scheduleData, location: e.target.value})}
                placeholder="Cleanup location"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="schedule-details">Details</Label>
              <Textarea 
                id="schedule-details" 
                value={scheduleData.details} 
                onChange={(e) => setScheduleData({...scheduleData, details: e.target.value})}
                placeholder="Enter schedule details..."
                className="min-h-[100px]"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="schedule-files">Upload Schedule Files</Label>
              <div className="flex items-center gap-2">
                <Input 
                  id="schedule-files" 
                  type="file" 
                  className="hidden"
                  onChange={(e) => handleFileChange(e, 'schedule')}
                  multiple
                />
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => document.getElementById('schedule-files')?.click()}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Upload className="h-4 w-4" />
                  Browse Files
                </Button>
              </div>
              {scheduleData.files && scheduleData.files.length > 0 && (
                <div className="text-sm text-muted-foreground mt-1">
                  {scheduleData.files.length} file(s) selected
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowScheduleDialog(false)}>Cancel</Button>
            <Button type="submit" onClick={handleSubmitSchedule}>Send Schedule</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactsManagement;
