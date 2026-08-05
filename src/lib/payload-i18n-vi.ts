/**
 * Override tiếng Việt cho admin Payload.
 * Mục tiêu: chữ dễ hiểu với người dùng nghiệp vụ GreenOLI,
 * tránh nhầm "thư viện" với Cloudinary.
 *
 * Dùng plain object (không satisfies chặt) để tránh lệch key giữa các bản Payload.
 */
export const viAdminOverrides = {
  general: {
    collections: "Danh mục quản lý",
    allCollections: "Tất cả mục quản lý",
    document: "Bản ghi",
    documents: "Bản ghi",
    createNew: "Tạo mới",
    createNewLabel: "Tạo {{label}} mới",
    creatingNewLabel: "Đang tạo {{label}} mới",
    save: "Lưu",
    saveChanges: "Lưu thay đổi",
    uploading: "Đang tải lên...",
    uploadingBulk: "Đang tải lên {{current}}/{{total}}",
  },
  fields: {
    addUpload: "Thêm ảnh/video",
    chooseFromExisting: "Chọn file đã tải trên máy chủ",
    selectExistingLabel: "Chọn {{label}} đã có trên máy chủ",
    uploadNewLabel: "Tải file mới: {{label}}",
    swapUpload: "Đổi file",
    removeUpload: "Gỡ file",
  },
  upload: {
    addFile: "Thêm file",
    addFiles: "Thêm nhiều file",
    bulkUpload: "Tải nhiều file cùng lúc",
    dragAndDrop: "Kéo thả file vào đây",
    dragAndDropHere: "hoặc kéo thả file vào đây",
    selectCollectionToBrowse: "Chọn nơi chứa file để xem",
    selectFile: "Chọn file từ máy tính",
    fileToUpload: "File cần tải lên",
    filesToUpload: "Các file cần tải lên",
    noFile: "Chưa có file",
  },
};
