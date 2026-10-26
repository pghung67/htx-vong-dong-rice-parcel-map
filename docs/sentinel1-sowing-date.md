# Ground-truthing Sentinel-1 sowing dates / Kiểm chứng ngày sạ từ Sentinel-1

## Purpose / Mục đích

Parcel records collected with the cooperative (parcel code, variety, sowing date) serve as ground truth for validating sowing dates detected from Sentinel-1 SAR time series.
Bản ghi thửa ruộng thu thập cùng HTX (mã thửa, giống, ngày sạ) được dùng làm dữ liệu thực địa để kiểm chứng ngày sạ phát hiện từ chuỗi ảnh radar Sentinel-1.

## Workflow / Quy trình

1. Record sowing date per parcel with the cooperative. / Ghi nhận ngày sạ theo thửa cùng HTX.
2. Join records to the parcel layer by anonymous parcel code. / Gắn bản ghi vào lớp thửa theo mã thửa ẩn danh.
3. Extract Sentinel-1 backscatter time series per parcel. / Trích chuỗi tán xạ ngược Sentinel-1 cho từng thửa.
4. Detect the sowing date from the backscatter signal. / Phát hiện ngày sạ từ tín hiệu tán xạ ngược.
5. Compare detected and recorded dates (for example, mean absolute error in days). / So sánh ngày phát hiện và ngày ghi nhận (ví dụ sai số tuyệt đối trung bình, tính theo ngày).

## To complete / Cần bổ sung

The author should add here: the exact detection rule used, the polarisation (VV/VH), the number of parcels and seasons validated, and the results. Do not publish results that have not been verified.
Tác giả bổ sung tại đây: quy tắc phát hiện cụ thể, phân cực (VV/VH), số thửa và số vụ đã kiểm chứng, kết quả. Chỉ công bố kết quả đã được kiểm tra.
