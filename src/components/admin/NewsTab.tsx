import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Newspaper, Star, Calendar } from "lucide-react";
import { format } from "date-fns";
import { sq } from "date-fns/locale";

interface NewsItem {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  image_url: string | null;
  category: string | null;
  is_published: boolean | null;
  is_featured: boolean | null;
  published_at: string | null;
  created_at: string;
}

const NewsTab = () => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    image_url: "",
    category: "",
    is_published: false,
    is_featured: false,
    published_at: ""
  });

  const { data: newsItems, isLoading } = useQuery({
    queryKey: ['admin-news'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('news_items')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as NewsItem[];
    }
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const insertData = {
        ...data,
        published_at: data.is_published ? new Date().toISOString() : null
      };
      const { error } = await supabase.from('news_items').insert([insertData]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-news'] });
      toast.success("Lajmi u shtua me sukses!");
      resetForm();
    },
    onError: () => toast.error("Gabim gjatë shtimit!")
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: typeof formData }) => {
      const updateData = {
        ...data,
        published_at: data.is_published && !editingItem?.published_at ? new Date().toISOString() : editingItem?.published_at
      };
      const { error } = await supabase.from('news_items').update(updateData).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-news'] });
      toast.success("Lajmi u përditësua me sukses!");
      resetForm();
    },
    onError: () => toast.error("Gabim gjatë përditësimit!")
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('news_items').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-news'] });
      toast.success("Lajmi u fshi me sukses!");
    },
    onError: () => toast.error("Gabim gjatë fshirjes!")
  });

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      excerpt: "",
      image_url: "",
      category: "",
      is_published: false,
      is_featured: false,
      published_at: ""
    });
    setEditingItem(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (item: NewsItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      content: item.content,
      excerpt: item.excerpt || "",
      image_url: item.image_url || "",
      category: item.category || "",
      is_published: item.is_published ?? false,
      is_featured: item.is_featured ?? false,
      published_at: item.published_at || ""
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const categories = ["Ngjarje", "Lajme", "Njoftim", "Arritje", "Sport", "Arte", "Aktivitet"];

  if (isLoading) {
    return <div className="text-center py-8">Duke ngarkuar...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Lajmet & Ngjarjet</h2>
          <p className="text-muted-foreground">Të Rejat e Shkollës dhe Data të Rëndësishme</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="w-4 h-4 mr-2" />
              Shto Lajm
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? "Përditëso Lajmin" : "Shto Lajm të Ri"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Titulli *</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>Kategoria</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Zgjidh kategorinë" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Përmbledhje</Label>
                <Textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={2}
                  placeholder="Një përmbledhje e shkurtër..."
                />
              </div>
              <div>
                <Label>Përmbajtja *</Label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={6}
                  required
                />
              </div>
              <div>
                <Label>URL e Imazhit</Label>
                <Input
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={formData.is_published}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
                  />
                  <Label>Publikuar</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={formData.is_featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                  />
                  <Label>I Veçantë</Label>
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Anulo
                </Button>
                <Button type="submit">
                  {editingItem ? "Përditëso" : "Shto"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {newsItems?.map((item) => (
          <Card key={item.id} className={!item.is_published ? "opacity-60 border-dashed" : ""}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {item.is_featured && (
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    )}
                    {item.category && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                        {item.category}
                      </span>
                    )}
                    {!item.is_published && (
                      <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">
                        Draft
                      </span>
                    )}
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </div>
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost" onClick={() => handleEdit(item)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-destructive"
                    onClick={() => deleteMutation.mutate(item.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {item.excerpt && (
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{item.excerpt}</p>
              )}
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />
                {format(new Date(item.created_at), "d MMMM yyyy", { locale: sq })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {(!newsItems || newsItems.length === 0) && (
        <div className="text-center py-12 text-muted-foreground">
          <Newspaper className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Nuk ka lajme. Shtoni të parën!</p>
        </div>
      )}
    </div>
  );
};

export default NewsTab;
