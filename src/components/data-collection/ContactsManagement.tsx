import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Users, User, Send, Link } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

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
  
  const [newContact, setNewContact] = useState({
    name: "",
    email: "",
    organization: "",
    role: "",
    type: "cleanup" as const
  });
  
  const [filter, setFilter] = useState("all");
  
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
    toast({
      title: "Schedule Shared",
      description: `Cleanup schedule has been shared with ${contact.name}.`,
    });
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
                        <Send className="h-4 w-4" />
                        Send Schedule
                      </Button>
                    )}
                    <Button size="sm" className="flex items-center gap-2">
                      <Link className="h-4 w-4" />
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
                onValueChange={(value: "cleanup" | "government" | "publisher" | "public") => 
                  setNewContact({...newContact, type: value as "cleanup" | "government" | "publisher" | "public"})
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
    </div>
  );
};

export default ContactsManagement;
