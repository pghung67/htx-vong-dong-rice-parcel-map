# HTX Vọng Đông Rice Parcel Map

[English](#english) | [Tiếng Việt](#tiếng-việt)

---

## English

A free, open toolkit for parcel-level rice field mapping for agricultural cooperatives (HTX) in Vọng Đông commune, An Giang province, in the Vietnamese Mekong Delta.

### Why this exists

Smallholder cooperatives in the Mekong Delta rarely have access to low-cost tools that show which parcel is planted with which variety and when it was sown. This project provides a simple web map that links each rice parcel to its variety and sowing-date record, and documents how those records can be used as ground truth for Sentinel-1 sowing-date detection.

### What is in this repository

| Folder | Content |
|---|---|
| `gee/` | Google Earth Engine (JavaScript) code for the parcel map app |
| `web/` | Source of the cooperative rice-field web map (optional) |
| `docs/` | Method notes, including ground-truthing of Sentinel-1 sowing dates |
| `data/sample/` | Anonymised sample data showing the expected schema |

### Live demos

- Earth Engine app: https://gen-lang-client-0854910220.projects.earthengine.app/view/htxnn-vong-dong
- Web map: https://htx-vong-dong-agn.netlify.app/

### Data schema

Each parcel record has an anonymous parcel code (for example `BT8-05`), a rice variety, and a sowing date. Farmer names and other personal data are never published in this repository.

### How to reuse

1. Open the script in `gee/` in the Earth Engine Code Editor.
2. Replace the parcel asset with your own cooperative's parcel layer, following the schema in `data/sample/`.
3. Publish it as an Earth Engine App.

### Author

Phạm Duy Tiễn, Faculty of Agriculture and Natural Resources, An Giang University, VNU-HCM. ORCID: 0000-0002-1176-6138.

### License

MIT. See `LICENSE`.

---

## Tiếng Việt

Bộ công cụ mở, miễn phí để lập bản đồ ruộng lúa đến cấp thửa cho các hợp tác xã nông nghiệp (HTX) tại xã Vọng Đông, tỉnh An Giang, vùng Đồng bằng sông Cửu Long.

### Mục đích

Các HTX quy mô nhỏ ở ĐBSCL hiếm khi có công cụ chi phí thấp để biết thửa nào trồng giống gì và sạ khi nào. Dự án cung cấp một bản đồ web đơn giản gắn mỗi thửa ruộng với giống lúa và ngày sạ, đồng thời mô tả cách dùng các bản ghi này làm dữ liệu thực địa để kiểm chứng việc phát hiện ngày sạ từ ảnh Sentinel-1.

### Nội dung kho mã

| Thư mục | Nội dung |
|---|---|
| `gee/` | Mã Google Earth Engine (JavaScript) của ứng dụng bản đồ thửa ruộng |
| `web/` | Mã nguồn bản đồ web ruộng lúa của HTX (tùy chọn) |
| `docs/` | Ghi chú phương pháp, gồm kiểm chứng ngày sạ Sentinel-1 |
| `data/sample/` | Dữ liệu mẫu đã ẩn danh, minh họa cấu trúc dữ liệu |

### Bản chạy thử

- Ứng dụng Earth Engine: https://gen-lang-client-0854910220.projects.earthengine.app/view/htxnn-vong-dong
- Bản đồ web: https://htx-vong-dong-agn.netlify.app/

### Cấu trúc dữ liệu

Mỗi thửa có mã thửa ẩn danh (ví dụ `BT8-05`), giống lúa và ngày sạ. Kho mã này không công bố tên nông hộ hay dữ liệu cá nhân.

### Cách tái sử dụng

1. Mở mã trong `gee/` bằng Earth Engine Code Editor.
2. Thay lớp thửa ruộng bằng dữ liệu của HTX bạn, theo cấu trúc trong `data/sample/`.
3. Xuất bản thành Earth Engine App.

### Tác giả

Phạm Duy Tiễn, Khoa Nông nghiệp và Tài nguyên thiên nhiên, Trường Đại học An Giang, ĐHQG-HCM. ORCID: 0000-0002-1176-6138.

### Giấy phép

MIT. Xem tệp `LICENSE`.

---

## Note on the code / Ghi chú về mã nguồn

The script in `gee/htx-giam-sat-lua-v24.js` is a demo version. The embedded fallback data use anonymised household labels ("Hộ BT8-xx"); real household names are kept in the cooperative's private asset and are not published here.
Mã trong `gee/htx-giam-sat-lua-v24.js` là bản demo. Dữ liệu dự phòng nhúng trong mã dùng nhãn hộ ẩn danh ("Hộ BT8-xx"); tên hộ thật nằm trong asset riêng của HTX và không công bố tại đây.
