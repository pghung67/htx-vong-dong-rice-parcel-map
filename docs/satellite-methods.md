# How the app uses Sentinel-1 and Sentinel-2 / Cách app dùng ảnh Sentinel-1 và Sentinel-2

This note describes what the code in `gee/htx-giam-sat-lua-v24.js` actually does. It is a demo. The thresholds are heuristic and have not been formally validated against field data.
Tài liệu này mô tả đúng những gì mã trong `gee/htx-giam-sat-lua-v24.js` thực hiện. Đây là bản demo. Các ngưỡng là kinh nghiệm, chưa được kiểm chứng chính thức với số liệu thực địa.

## Important: sowing date is not detected from satellite / Lưu ý: ngày sạ không suy ra từ vệ tinh

The sowing date and the variety of each parcel are declared by the cooperative (HTX). The app uses them to compute days after sowing (DAS) and the expected harvest date. It does not estimate sowing dates from Sentinel-1.
Ngày sạ và giống của từng thửa do HTX khai báo. App dùng chúng để tính số ngày sau sạ (DAS) và ngày thu hoạch dự kiến. App không ước lượng ngày sạ từ Sentinel-1.

## Data / Dữ liệu

| Source / Nguồn | Processing / Xử lý |
|---|---|
| Sentinel-2 SR Harmonized | Cloud Score+ mask (keep pixels with score ≥ 0.60). NDVI = (B8 − B4) / (B8 + B4), sampled per parcel at 10 m. |
| Sentinel-1 GRD | IW mode, VH and VV, descending orbit. Pixels with VH or VV ≤ −30 dB are masked. VH is sampled per parcel at 20 m. |
| Season / Vụ | From 2026-04-01 to the current date (Hè Thu 2026). |

## Growth-stage rules / Quy tắc giai đoạn sinh trưởng

The stage of each parcel is assigned from its NDVI series (at least 3 clean images are required):

| Condition / Điều kiện | Stage / Giai đoạn |
|---|---|
| Fewer than 3 clean images | Not enough data |
| Peak NDVI > 0.55 and latest NDVI < 0.35 | Harvested |
| Peak NDVI > 0.55, latest image after the peak, latest NDVI < 0.55 | Ripening |
| Peak NDVI > 0.55, latest image after the peak | Ripening (leaves yellowing) |
| Latest NDVI ≥ 0.65 | Booting to heading |
| Latest NDVI ≥ 0.45 | Tillering |
| Otherwise | Seedling / just sown |

## Harvest alerts / Cảnh báo thu hoạch

- Days overdue = DAS − growth duration of the variety (OM 5451: 95 days, OM 18: 100, Đài Thơm 8: 100, IR 50404: 90, default 95).
- A parcel is flagged as overdue and urgent if it is past the duration and Sentinel-1 VH has not dropped.
- A VH drop of more than 3 dB from the seasonal peak is treated as a sign that the parcel has already been harvested.
- Parcels within 7 days of the expected harvest date are flagged as approaching harvest.

## Comparison with surrounding fields / So sánh với ruộng lân cận

For each parcel, the mean NDVI of a 500 m ring around it (parcel excluded) is taken from the Sentinel-2 image closest in time (within 3 days). A difference below −0.10 suggests earlier ripening or harvest than neighbours. A difference above +0.10 suggests later ripening.

## Yield estimate / Ước tính sản lượng

Expected yield = declared area × reference yield of the variety × vigour factor from peak NDVI (≥ 0.80: 1.05; ≥ 0.70: 1.00; ≥ 0.60: 0.92; otherwise 0.85). Fresh paddy is converted to dry paddy with a factor of 0.80.
The reference yields are general values for the Mekong Delta, not measured data. The cooperative should replace them with its own historical yields. Declared area is used because the parcel boundaries in the demo are approximate.

## Map layers / Lớp bản đồ

NDVI, NDRE (B8A, B5), PSRI, LSWI (B8, B11), Sentinel-1 VH, and Sentinel-1 RVI. The colour range is stretched to the 2nd to 98th percentile of the image in view.

## Limitations / Hạn chế

- Thresholds and stage rules have not been validated against field-recorded stages.
- The yield estimate uses reference yields, not measured ones.
- Cloud cover limits the number of usable Sentinel-2 images; Sentinel-1 is used as a cloud-independent check.
- Satellite-derived stages are estimates and need field verification before they are used for production decisions.

Các hạn chế trên bằng tiếng Việt: ngưỡng chưa kiểm chứng với giai đoạn ghi nhận ngoài ruộng; sản lượng dùng năng suất tham khảo; mây làm giảm số ảnh Sentinel-2 dùng được; giai đoạn suy từ vệ tinh chỉ là ước lượng và cần đối chiếu thực địa trước khi dùng cho quyết định sản xuất.
