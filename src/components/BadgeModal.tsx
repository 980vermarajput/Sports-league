import { memo, useEffect } from "react";

interface BadgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  leagueName: string;
  badgeUrl: string | null;
  isLoading: boolean;
}

const BadgeModal = memo(
  ({ isOpen, onClose, leagueName, badgeUrl, isLoading }: BadgeModalProps) => {
    // Handle Escape key press
    useEffect(() => {
      const handleEscapePress = (event: KeyboardEvent) => {
        if (event.key === "Escape" && isOpen) {
          onClose();
        }
      };

      if (isOpen) {
        document.addEventListener("keydown", handleEscapePress);
        // Prevent body scroll when modal is open
        document.body.style.overflow = "hidden";
      }

      return () => {
        document.removeEventListener("keydown", handleEscapePress);
        document.body.style.overflow = "unset";
      };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };

    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={handleBackdropClick}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-bold text-gray-800 pr-4">
              {leagueName} Badge
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
              aria-label="Close modal"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="flex justify-center items-center h-48">
            {isLoading ? (
              <div className="flex flex-col items-center space-y-3">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600"></div>
                <p className="text-gray-500 text-sm">Loading badge...</p>
              </div>
            ) : badgeUrl ? (
              <div className="text-center">
                <div className="bg-gray-50 rounded-xl p-6 mb-3">
                  <img
                    src={badgeUrl}
                    alt={`${leagueName} badge`}
                    className="h-24 w-24 object-contain mx-auto"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
                <p className="text-gray-600 text-sm">Season Badge</p>
              </div>
            ) : (
              <div className="text-center">
                <div className="bg-gray-100 rounded-xl p-8 mb-3">
                  <svg
                    className="w-16 h-16 text-gray-400 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="text-gray-600 text-sm">No badge available</p>
              </div>
            )}
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
);

BadgeModal.displayName = "BadgeModal";

export default BadgeModal;
