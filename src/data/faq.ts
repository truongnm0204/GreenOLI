/**
 * Câu hỏi thường gặp — hiển thị storefront + JSON-LD FAQPage.
 * Chỉnh nội dung tại đây (hoặc sau này đưa vào CMS).
 */
export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const HOME_FAQS: FaqItem[] = [
  {
    id: "phan-phoi",
    question: "Oli Xanh phân phối những dòng sản phẩm nào?",
    answer:
      "Oli Xanh chuyên phân phối hóa chất và thiết bị kiểm soát côn trùng, mối, chuột từ các tập đoàn đa quốc gia, phục vụ khu vực phía Bắc. Danh mục cụ thể xem tại Cửa hàng trên website.",
  },
  {
    id: "khu-vuc",
    question: "Khu vực phục vụ và hình thức hợp tác?",
    answer:
      "Chúng tôi tập trung phân phối và tư vấn giải pháp tại khu vực phía Bắc. Doanh nghiệp, nhà thầu và đơn vị dịch vụ có thể liên hệ để được hỗ trợ báo giá, tài liệu kỹ thuật và hướng dẫn sử dụng.",
  },
  {
    id: "bao-gia",
    question: "Làm sao để nhận tư vấn hoặc báo giá?",
    answer:
      "Bạn có thể gọi hotline, chat Zalo, hoặc gửi form Liên hệ. Từ trang sản phẩm, nút “Tư vấn / báo giá” sẽ điền sẵn tên và quy cách sản phẩm để đội ngũ phản hồi nhanh hơn.",
  },
  {
    id: "an-toan-esg",
    question: "Sản phẩm có an toàn và hướng tới tiêu chuẩn ESG không?",
    answer:
      "Các giải pháp được lựa chọn theo hướng an toàn hơn cho sức khỏe và môi trường, đồng thời hỗ trợ doanh nghiệp hướng tới tiêu chuẩn ESG. Vui lòng tuân thủ hướng dẫn trên nhãn và tài liệu kỹ thuật của từng sản phẩm.",
  },
  {
    id: "tai-lieu",
    question: "Có tài liệu kỹ thuật, SDS hoặc video hướng dẫn không?",
    answer:
      "Nhiều sản phẩm có mô tả chi tiết, thông số, tài liệu đính kèm và video trên trang sản phẩm. Nếu cần bản SDS/catalog đầy đủ, hãy để lại yêu cầu qua form liên hệ.",
  },
  {
    id: "thoi-gian-phan-hoi",
    question: "Thời gian phản hồi yêu cầu tư vấn là bao lâu?",
    answer:
      "Trong giờ làm việc (T2–T7), đội ngũ thường phản hồi trong vòng 24 giờ làm việc qua điện thoại, Zalo hoặc email bạn cung cấp.",
  },
];
