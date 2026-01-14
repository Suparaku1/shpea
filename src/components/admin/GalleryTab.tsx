import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Image, Video, Camera } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  media_url: string;
  media_type: string;
  thumbnail_url: string | null;
  category: string | null;
  is_active: boolean | null;
  sort_order: number | null;
}

const GalleryTab = () => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    media_url: "",
    media_type: "image",
    thumbnail_url: "",
    category: "",
    is_active: true,
    sort_order: 0
  });

  const { data: galleryItems, isLoading } = useQuery({
    queryKey: ['admin-gallery'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gallery_items')
        .select('*')
        .order('sort_order', { ascending: true });
      if (error) throw error;
      return data as GalleryItem[];
    }
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const { error } = await supabase.from('gallery_items').insert([data]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-gallery'] });
      toast.success("Media u shtua me sukses!");
      resetForm();
    },
    onError: () => toast.error("Gabim gjatë shtimit!")
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: typeof formData }) => {
      const { error } = await supabase.from('gallery_items').update(data).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-gallery'] });
      toast.success("Media u përditësua me sukses!");
      resetForm();
    },
    onError: () => toast.error("Gabim gjatë përditësimit!")
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('gallery_items').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-gallery'] });
      toast.success("Media u fshi me sukses!");
    },
    onError: () => toast.error("Gabim gjatë fshirjes!")
  });

  const resetForm = () => {
    setFormData({
      title: "",
      media_url: "",
      media_type: "image",
      thumbnail_url: "",
      category: "",
      is_active: true,
      sort_order: 0
    });
    setEditingItem(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      media_url: item.media_url,
      media_type: item.media_type,
      thumbnail_url: item.thumbnail_url || "",
      category: item.category || "",
      is_active: item.is_active ?? true,
      sort_order: item.sort_order ?? 0
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

  const categories = ["Aktivitete", "Evente", "Klasa", "Sport", "Arte", "Festime"];

  if (isLoading) {
    return <div className="text-center py-8">Duke ngarkuar...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Galeria</h2>
          <p className="text-muted-foreground">Foto & Video nga Aktivitetet</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="w-4 h-4 mr-2" />
              Shto Media
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? "Përditëso Media" : "Shto Media të Re"}
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
                <Label>Lloji i Medias *</Label>
                <Select
                  value={formData.media_type}
                  onValueChange={(value) => setFormData({ ...formData, media_type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="image">Foto</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>URL e Medias *</Label>
                <Input
                  value={formData.media_url}
                  onChange={(e) => setFormData({ ...formData, media_url: e.target.value })}
                  placeholder="https://..."
                  required
                />
              </div>
              {formData.media_type === "video" && (
                <div>
                  <Label>URL e Thumbnail</Label>
                  <Input
                    value={formData.thumbnail_url}
                    onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
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
                  <Label>Renditja</Label>
                  <Input
                    type="number"
                    value={formData.sort_order}
                    onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
                <Label>Aktiv</Label>
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {galleryItems?.map((item) => (
          <Card key={item.id} className={`overflow-hidden ${!item.is_active ? "opacity-50" : ""}`}>
            <div className="relative aspect-video bg-muted">
              {item.media_type === "image" ? (
                <img
                  src={item.media_url}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-black/10">
                  {item.thumbnail_url ? (
                    <img
                      src={item.thumbnail_url}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Video className="w-12 h-12 text-muted-foreground" />
                  )}
                </div>
              )}
              <div className="absolute top-2 left-2">
                <span className="bg-black/60 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                  {item.media_type === "image" ? <Image className="w-3 h-3" /> : <Video className="w-3 h-3" />}
                  {item.media_type === "image" ? "Foto" : "Video"}
                </span>
              </div>
              <div className="absolute top-2 right-2 flex gap-1">
                <Button size="icon" variant="secondary" className="h-8 w-8" onClick={() => handleEdit(item)}>
                  <Pencil className="w-3 h-3" />
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  className="h-8 w-8"
                  onClick={() => deleteMutation.mutate(item.id)}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
            <CardContent className="p-3">
              <h3 className="font-medium text-sm truncate">{item.title}</h3>
              {item.category && (
                <span className="text-xs text-muted-foreground">{item.category}</span>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {(!galleryItems || galleryItems.length === 0) && (
        <div className="text-center py-12 text-muted-foreground">
          <Camera className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Nuk ka media në galeri. Shtoni të parën!</p>
        </div>
      )}
    </div>
  );
};

export default GalleryTab;
