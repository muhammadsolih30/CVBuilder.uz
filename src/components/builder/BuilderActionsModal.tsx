import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  BookOpen,
  Sparkles,
  Save,
  Download,
  Upload,
  RotateCcw,
  ChevronRight,
  Sparkle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface BuilderActionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadDemo: (type: "it" | "marketing") => void;
  onOpenSaved: () => void;
  onExportJSON: () => void;
  onImportJSONClick: () => void;
  onReset: () => void;
}

export default function BuilderActionsModal({
  isOpen,
  onClose,
  onLoadDemo,
  onOpenSaved,
  onExportJSON,
  onImportJSONClick,
  onReset,
}: BuilderActionsModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative w-full max-w-lg bg-card rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-border flex justify-between items-center bg-muted/40">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shadow-sm text-white">
                <Sparkle className="w-4 h-4 fill-white" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-foreground">
                  Amallar va Namunalar
                </h2>
                <p className="text-xs text-muted-foreground">
                  Namunalar, saqlanganlar va zaxira boshqaruvi
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground"
              aria-label="Yopish"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content Body */}
          <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
            {/* Bo'lim 1: Namunalar */}
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground px-1 mb-2 block">
                Tayyor Namunalar bilan to'ldirish
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    onLoadDemo("it");
                    onClose();
                  }}
                  className="flex items-start gap-3 p-3 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all text-left group"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 text-primary group-hover:scale-105 transition-transform">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs sm:text-sm font-semibold text-foreground flex items-center justify-between">
                      <span>IT Namunasi</span>
                      <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2">
                      Dasturchi rezyumesi tajriba va ko'nikmalari bilan
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onLoadDemo("marketing");
                    onClose();
                  }}
                  className="flex items-start gap-3 p-3 rounded-xl border border-border bg-card hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all text-left group"
                >
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 text-emerald-600 group-hover:scale-105 transition-transform">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs sm:text-sm font-semibold text-foreground flex items-center justify-between">
                      <span>Marketing Namunasi</span>
                      <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2">
                      SMM va raqamli marketing mutaxassisi namunasi
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* Bo'lim 2: Saqlanganlar va Zaxira */}
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground px-1 mb-2 block">
                Saqlanganlar va Zaxira
              </span>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenSaved();
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-muted/50 transition-all text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0 text-blue-600">
                      <Save className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-foreground">
                        Saqlangan Rezyumelar
                      </h4>
                      <p className="text-[11px] text-muted-foreground">
                        Oldin brauzerda saqlangan rezyumelaringiz tarixi
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
                </button>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onExportJSON();
                      onClose();
                    }}
                    className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card hover:border-border hover:bg-muted/50 transition-all text-left group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0 text-foreground">
                      <Download className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-semibold text-foreground">
                        Zaxira (JSON)
                      </div>
                      <p className="text-[10px] text-muted-foreground truncate">
                        Fayl ko'rinishida yuklab olish
                      </p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onImportJSONClick();
                    }}
                    className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card hover:border-border hover:bg-muted/50 transition-all text-left group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0 text-foreground">
                      <Upload className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-semibold text-foreground">
                        Tiklash (JSON)
                      </div>
                      <p className="text-[10px] text-muted-foreground truncate">
                        Fayldan qayta yuklash
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Bo'lim 3: Tozalash */}
            <div className="pt-2 border-t border-border">
              <button
                type="button"
                onClick={() => {
                  onReset();
                  onClose();
                }}
                className="w-full flex items-center justify-between p-2.5 px-3 rounded-xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-destructive transition-all text-left"
              >
                <div className="flex items-center gap-2.5">
                  <RotateCcw className="w-4 h-4 text-destructive" />
                  <div>
                    <span className="text-xs font-semibold">Barchasini tozalash</span>
                    <p className="text-[10px] text-destructive/80">
                      Barcha maydonlarni bo'shatib yangidan boshlash
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-medium underline">Tozalash</span>
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-border bg-muted/20 flex justify-end">
            <Button size="sm" variant="ghost" onClick={onClose} className="h-8 text-xs">
              Yopish
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
