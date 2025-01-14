import IconCancel from "@/components/svg/IconCancel";
import IconDownload from "@/components/svg/IconDownload";

interface DownloadDialogProps {
    onCancel: () => void;
    onConfirm: () => void;
}

const DownloadDialog: React.FC<DownloadDialogProps> = ({ onCancel, onConfirm }) => {
    return (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 space-y-4">
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-[var(--dvs-orange)]/10 rounded-full">
                        <IconCancel />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-[var(--dvs-gray-dark)]">Übertragung fehlgeschlagen</h3>
                        <p className="mt-1 text-sm text-[var(--dvs-gray)]">
                            Möchten Sie die Datei stattdessen herunterladen?
                        </p>
                    </div>
                </div>
                <div className="flex justify-end gap-3 pt-2">
                    <button
                        onClick={onCancel}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[var(--dvs-gray-dark)] bg-white hover:bg-gray-50/80 rounded-lg shadow-sm transition-all duration-200 border border-gray-200 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--dvs-orange)]/20 focus:ring-offset-1"
                    >
                        Abbrechen
                    </button>
                    <button
                        onClick={onConfirm}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[var(--dvs-orange)] bg-gradient-to-br from-[var(--dvs-orange)]/10 via-[var(--dvs-orange)]/5 to-transparent rounded-lg hover:from-[var(--dvs-orange)]/15 hover:via-[var(--dvs-orange)]/10 hover:to-transparent transition-all duration-200 shadow-sm hover:shadow border border-[var(--dvs-orange)]/10 focus:outline-none focus:ring-2 focus:ring-[var(--dvs-orange)]/20 focus:ring-offset-1"
                    >
                        <IconDownload />
                        Herunterladen
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DownloadDialog;