import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, Trash2, FileText, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SavedCV {
  id: string;
  name: string;
  date: string;
  data: any;
}

interface SavedCVsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoad: (data: any) => void;
}

export default function SavedCVsModal({
  isOpen,
  onClose,
  onLoad,
}: SavedCVsModalProps) {
  const [savedList, setSavedList] = useState<SavedCV[]>([]);

  useEffect(() => {
    if (isOpen) {
      const listStr = localStorage.getItem("cv-builder-saved-list");
      if (listStr) {
        try {
          setSavedList(JSON.parse(listStr).reverse());
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, [isOpen]);

  const handleDelete = (id: string) => {
    const newList = savedList.filter((cv) => cv.id !== id);
    setSavedList(newList);
    localStorage.setItem("cv-builder-saved-list", JSON.stringify(newList.slice().reverse()));
  };

  const handleLoad = (data: any) => {
    onLoad(data);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-card rounded-2xl shadow-2xl border overflow-hidden flex flex-col max-h-[85vh]"
        >
          <div className="p-5 sm:p-6 border-b flex justify-between items-center bg-muted/30">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Saqlangan Rezyumelar
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Oldin saqlagan rezyumelaringiz tarixi
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-5 sm:p-6 overflow-y-auto flex-1 custom-scrollbar">
            {savedList.length === 0 ? (
              <div className="text-center py-10">
                <FileText className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                <h3 className="text-lg font-semibold">Hali hech narsa yo'q</h3>
                <p className="text-muted-foreground text-sm mt-1">
                  Rezyumeni yaratish jarayonining 8-bosqichida "Saqlash" tugmasini bosing
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {savedList.map((cv) => (
                  <div
                    key={cv.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl border bg-card hover:border-primary/40 transition-colors gap-4"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground truncate">
                        {cv.name || "Nomsiz Rezyume"}
                      </h4>
                      <div className="flex items-center gap-4 mt-1.5 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {new Date(cv.date).toLocaleString('uz-UZ', {
                            dateStyle: 'short',
                            timeStyle: 'short',
                          })}
                        </span>
                        <span>{cv.data?.template || 't001'}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleLoad(cv.data)}
                        className="flex-1 sm:flex-none text-xs gap-1.5"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        Yuklash
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(cv.id)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 flex-shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
