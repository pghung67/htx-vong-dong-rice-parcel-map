/**** =====================================================================
 *  GIÁM SÁT LÚA HÈ THU 2026 — HTX VỌNG ĐÔNG (BÌNH THÀNH 8)
 *  ---------------------------------------------------------------------
 *  NHÓM RD_AGU · Trường Đại học An Giang — ĐHQG-HCM
 *  Sản phẩm dự thi · bản demo (v24)
 *  =====================================================================
 *  PHIÊN BẢN CÔNG KHAI: họ tên chủ hộ trong dữ liệu nhúng (FALLBACK_PLOTS)
 *  đã được thay bằng nhãn ẩn danh "Hộ BT8-xx". Dữ liệu thật nằm trong
 *  asset riêng của HTX, không đưa lên kho mã này.
 *  =====================================================================
 *  v24 — SỬA 3 LỖI HIỂN THỊ BẢN ĐỒ của v23:
 *   [!] BẢNG MÀU SAI LOẠI: dùng bảng phân kỳ tím↔xanh cho NDRE, hàm ý
 *       có mốc giữa quan trọng trong khi không có. Mảng tím đọc như
 *       "báo động" dù chỉ là nước/đất trống. Nay dùng bảng TUẦN TỰ cho
 *       mọi chỉ số, chỉ giữ phân kỳ cho LSWI (mốc 0 thật sự có nghĩa).
 *   [!] VẪN BÃO HOÀ: min/max đặt tay quá rộng nên gần hết ruộng đụng
 *       trần màu. Nay TỰ GIÃN theo phần trăm vị 2%–98% của chính ảnh
 *       trong vùng đang xem -> dải màu luôn phủ đúng khoảng giá trị
 *       thực, tách được sắc thái giữa các thửa. Có nhớ kết quả.
 *   [!] NHÃN QUÁ NHỎ: scale=6 với fontSize=18 cho chữ cao ~5.7 pixel
 *       màn hình. Nay quy đổi cỡ chữ THEO MỨC PHÓNG để chữ luôn cao
 *       ~20 pixel ở mọi zoom, chữ đen viền trắng, nhích lên trên tâm
 *       thửa để không đè phần tô màu.
 *  ---------------------------------------------------------------------
 *  v23:
 *   [+] CHỌN LỚP CHỈ SỐ (6 lớp) — NDVI bão hoà ở sinh khối cao nên cả
 *       vùng cùng một sắc xanh. Bổ sung NDRE (red-edge, không bão hoà —
 *       ĐẶT LÀM MẶC ĐỊNH), PSRI (lão hoá/vàng lá), LSWI (ẩm & ruộng đã
 *       gặt), SAR VH và SAR RVI (xuyên mây). Dải màu đã giãn đúng khoảng
 *       giá trị thực nên tách sắc thái rõ hơn nhiều.
 *   [+] THỬA NỔI RÕ: viền đen dày phía dưới + viền trắng phía trên, tô
 *       giai đoạn nhạt hơn (0.42) để không nuốt mất nền chỉ số.
 *   [+] NHÃN MÃ THỬA trên bản đồ (01…10) qua gói users/gena/packages:text,
 *       bọc try/catch nên không nạp được gói thì app vẫn chạy.
 *   [+] THANH THỜI GIAN THU GỌN: mặc định một dòng (ngày + ◀ ▶ Nay ⌄),
 *       bấm ⌄ mới mở thanh trượt. Trả lại phần lớn diện tích bản đồ.
 *  ---------------------------------------------------------------------
 *  v22:
 *   [!] LOGO MỜ: params.dimensions đặt bằng cỡ hiển thị (54px) khiến GEE
 *       thu nhỏ ảnh ngay trên server bằng nội suy thô -> vòng chữ nát.
 *       Sửa: lấy ảnh 512px rồi để trình duyệt thu về 64px. Kèm bản
 *       logo_RD_AGU.tif mới 512x512 đã tăng nét và tương phản.
 *  ---------------------------------------------------------------------
 *  v21:
 *   [-] Bỏ huy hiệu nổi trên bản đồ (che mất vùng ruộng).
 *   [!] Xoá chân trang bị lặp hai lần — sót lại khi thay giao diện v20.
 *   [!] Logo: chọn band theo CHỈ SỐ select([0,1,2]) thay vì theo tên
 *       'b1','b2','b3' — chạy đúng dù GEE đặt tên band khác khi nạp.
 *       Huy hiệu dự phòng dựng lại theo tông logo trường (vàng/lá/xanh
 *       dương, có mốc 1999).
 *  ---------------------------------------------------------------------
 *  v19:
 *   [+] Gắn thương hiệu nhóm: đầu panel (logo + tên nhóm + đơn vị),
 *       huy hiệu nổi góc phải bản đồ (giữ nhận diện khi chụp màn hình),
 *       chân trang ghi nguồn dữ liệu.
 *       Logo: GEE không nạp PNG -> dùng file logo_RD_AGU.tif kèm theo,
 *       tải lên bằng Assets > NEW > Image upload rồi khai ASSET_LOGO.
 *       Bỏ trống ASSET_LOGO thì app hiện huy hiệu chữ "AGU".
 *   [-] Tắt các cảnh báo kỹ thuật về ranh thửa cho gọn giao diện trình
 *       bày. Kiểm tra vẫn nằm trong code, bật lại bằng
 *       SHOW_DATA_WARNINGS = true khi thẩm định số liệu thật.
 *  =====================================================================
 *  v18 — GIẢI BÀI TOÁN "NGƯỜI DÙNG APP KHÔNG SỬA ĐƯỢC ASSET"
 *  ---------------------------------------------------------------------
 *  SỰ THẬT NỀN TẢNG: GEE App chỉ ĐỌC. Người xem app KHÔNG BAO GIỜ ghi
 *  được vào asset — không có API, không có quyền. Bắt buộc phải có một
 *  người có quyền GEE đẩy dữ liệu vào. Việc còn lại là rút bước đó
 *  xuống ngắn nhất.
 *
 *  VÒNG CẬP NHẬT MỚI (cán bộ HTX không đụng GEE):
 *    1. Cán bộ HTX sửa Google Sheets (điện thoại cũng được).
 *    2. Menu 🌾 GEE > "★ Tạo mã / link cập nhật" -> copy LINK.
 *    3. Gửi link qua Zalo cho quản trị viên.
 *    4. Quản trị mở link trong CODE EDITOR -> số liệu đã nằm sẵn trong
 *       app (đọc từ tham số ?sua=) -> bấm "💾 Ghi vào asset" -> Tasks RUN.
 *    => Quản trị tốn ~30 giây, không tải file, không mở Excel.
 *
 *  Nếu không tiện gửi link: dán "mã cập nhật" vào ô "⤵ Nạp mã cập nhật"
 *  ở bảng tổng quan, kết quả như nhau.
 *  =====================================================================
 *  v17 CHỐNG SẬP KHI ASSET LỖI / BỊ XOÁ
 *  ---------------------------------------------------------------------
 *  Bối cảnh: bản v15 có gọi ee.data.deleteAsset() trước khi ghi. Nếu
 *  người dùng bấm nút ghi asset THỬA mà tác vụ sau đó không chạy được,
 *  asset ranh thửa bị XOÁ MẤT -> app báo "Collection asset not found"
 *  và chết hẳn. v16 đã gỡ lệnh xoá đó; v17 thêm lớp chống sập:
 *
 *   [+] Toàn bộ chuỗi phụ thuộc (plots, AOI, ảnh S1/S2, mẫu…) gom vào
 *       buildData(dungAsset) nên DỰNG LẠI ĐƯỢC.
 *   [+] Tiền kiểm: nếu asset lỗi hoặc không có thửa nào khớp vụ, app TỰ
 *       CHUYỂN sang 10 thửa nhúng trong code thay vì chết.
 *   [+] Băng cảnh báo đỏ ở bảng tổng quan + hướng dẫn PHỤC HỒI:
 *       bấm "💾 Ghi vào asset THỬA" là tạo lại asset từ dữ liệu nhúng.
 *
 *  => Dữ liệu 10 thửa nhúng trong code chính là BẢN SAO DỰ PHÒNG.
 *  =====================================================================
 *  v16 SỬA 2 LỖI của v15:
 *   [!] "Internal error: object not in API" (dòng 883): tạo nút bằng
 *       ui.Button('', fn, ...) — nhãn rỗng rồi setLabel sau. GEE không
 *       nhận. Nay dùng dạng object: ui.Button({label:…, onClick:…}).
 *   [!] "Unable to export features with null geometry": Export.table
 *       .toAsset() KHÔNG nhận feature hình học rỗng (khác toDrive vốn
 *       cho phép). Nút ghi asset thuộc tính tạo ee.Feature(null,…) nên
 *       tác vụ chết. Nay ghi kèm TÂM THỬA (điểm) — nhẹ, vẫn hợp lệ, và
 *       không ảnh hưởng phép ghép vì app ghép theo cột ma_ruong.
 *   [-] Bỏ ee.data.deleteAsset (không đáng tin trong Code Editor và
 *       nguy hiểm). Nếu asset đã tồn tại, tác vụ sẽ báo "Cannot
 *       overwrite asset" — vào tab Assets xoá thủ công rồi RUN lại.
 *  =====================================================================
 *  v15 thêm GHI THẲNG VÀO ASSET — bỏ hẳn vòng tải xuống/tải lên
 *  ---------------------------------------------------------------------
 *  Export.table.toAsset() ghi thẳng vào asset GEE. So với vòng CSV:
 *    • Không phải tải file về máy rồi tải lên lại.
 *    • GIỮ ĐƯỢC HÌNH HỌC — nên ghi được cả asset ranh thửa, việc mà
 *      xuất CSV không làm nổi (CSV xuất ra dùng cột .geo dạng GeoJSON,
 *      trình nạp CSV của GEE không đọc ngược được).
 *    • Toàn bộ vòng sửa → lưu nằm gọn trong Code Editor.
 *
 *  QUY TRÌNH MỚI (nhanh nhất, cho người dùng GEE):
 *    1. Mở script trong Code Editor, bấm Run.
 *    2. Bấm vào thửa → sửa giống/ngày sạ → Áp dụng. Lặp cho các thửa.
 *    3. Bảng tổng quan → "💾 Ghi vào asset ..." → bấm lần nữa xác nhận.
 *    4. Tab Tasks → RUN. Chờ 1–2 phút.
 *    5. Xong. Người dùng app tải lại trang là thấy số mới.
 *
 *  ⚠ GEE KHÔNG cho ghi đè asset đang tồn tại. Nút này tự XOÁ asset cũ
 *    rồi mới ghi, nên phải bấm hai lần để xác nhận. Giữ sẵn file CSV
 *    gốc để phục hồi nếu có sự cố.
 *  ⚠ Chỉ chạy trong Code Editor. App đã publish không có tab Tasks —
 *    bên đó dùng nút "📋 Hiện bảng CSV để copy".
 *  =====================================================================
 *  v14 GIẢI QUYẾT: CẬP NHẬT & LẤY DỮ LIỆU RA TỪ APP ĐÃ PUBLISH
 *  ---------------------------------------------------------------------
 *  App đã publish KHÔNG có: Export (không tab Tasks), print() (không có
 *  Console), quyền ghi asset, localStorage. Ba thứ CÒN DÙNG ĐƯỢC là
 *  ui.url, ui.Label(targetUrl) và hiển thị text để copy. v14 dựng giải
 *  pháp trên đúng ba thứ đó:
 *
 *   ① GHI NHẬN — chỉnh sửa lưu vào ĐƯỜNG DẪN (ui.url.set).
 *      Sửa giống/ngày sạ xong, đường dẫn app tự đổi. Copy thanh địa chỉ
 *      là đã lưu; mở lại link hoặc gửi cho người khác thì chỉnh sửa còn
 *      nguyên. Link ưu tiên cao hơn asset và META_OVERRIDE.
 *
 *   ② LẤY RA — nút "📋 Hiện bảng CSV để copy": in bảng CSV ngay trong
 *      panel, bôi đen + Ctrl+C, dán thẳng vào Excel. Thay cho Export
 *      vốn không chạy trong app.
 *
 *   ③ LƯU VĨNH VIỄN — dán CSV vào Excel, lưu UTF-8, Assets > NEW > CSV
 *      file > Asset ID = asset đang dùng > Overwrite. Mọi người tải lại
 *      app là thấy số mới.
 *
 *   ④ NHIỀU NGƯỜI CÙNG NHẬP (tùy chọn) — khai báo FORM_URL để app hiện
 *      liên kết mở Google Form; câu trả lời chảy vào Google Sheet, quản
 *      trị viên tải Sheet thành CSV rồi ghi đè asset theo bước ③.
 *  =====================================================================
 *  v13 SỬA LỖI "Collection asset ... not found":
 *   [!] v12 đặt sẵn USE_META_ASSET = true trong khi asset HTX-thuoctinh
 *       CHƯA được tải lên -> htPlots hỏng -> mọi lớp bản đồ lỗi theo và
 *       dòng fc.features báo "Cannot read property 'features' of
 *       undefined". Nay mặc định USE_META_ASSET = false; chỉ bật true
 *       SAU KHI đã tải asset thuộc tính thành công.
 *   [+] Thêm TIỀN KIỂM trước khi vẽ: đếm số thửa đọc được. Nếu asset
 *       thiếu / sai đường dẫn / lọc vụ không khớp thì hiện BẢNG KIỂM TRA
 *       6 bước trong panel thay vì để app sập trắng.
 *  ---------------------------------------------------------------------
 *  THỨ TỰ TRIỂN KHAI ĐÚNG:
 *    B1. USE_ASSET=false        -> chạy thử bằng 10 thửa nhúng trong code.
 *    B2. Tải HTX-ranh-thua.csv  -> USE_ASSET=true. Chạy lại.
 *    B3. Tải HTX-thuoctinh.csv  -> USE_META_ASSET=true. Chạy lại.
 *    Mỗi bước chạy được rồi mới sang bước sau.
 *  =====================================================================
 *  CẬP NHẬT DỮ LIỆU SAU KHI ĐÃ PUBLISH APP — ĐỌC KỸ MỤC NÀY
 *  ---------------------------------------------------------------------
 *  ĐỌC dữ liệu:  App đọc asset MỖI LẦN NGƯỜI DÙNG MỞ. Ghi đè asset là
 *                mọi người thấy số mới ngay, KHÔNG cần publish lại app.
 *
 *  GHI dữ liệu:  App KHÔNG ghi được vào asset. Các nút "⬇ Xuất CSV" chỉ
 *                chạy trong Code Editor (app đã publish không có tab
 *                Tasks). Việc cập nhật phải làm NGOÀI app.
 *
 *  VÒNG CẬP NHẬT (xuất → sửa → nhập lại):
 *     Code Editor: bấm "⬇ Xuất CSV thuộc tính" > tab Tasks > RUN
 *        ↓  file CSV về Google Drive
 *     Excel/Sheets: sửa cột giong, ngay_sa   (KHÔNG đổi cột ma_ruong)
 *        ↓  lưu CSV UTF-8
 *     Assets > NEW > CSV file > Asset ID = ASSET_META > Overwrite
 *        ↓
 *     Người dùng tải lại app → thấy số liệu mới.
 *
 *  VÌ SAO TÁCH 2 ASSET:
 *     • ASSET_PLOTS (HTX-ranh-thua)  = hình học, hiếm đổi.
 *     • ASSET_META  (HTX-thuoctinh)  = giống/ngày sạ, đổi thường xuyên.
 *       File này KHÔNG có cột wkt nên mở Excel sửa rất an toàn, và xuất
 *       ra rồi nhập lại được trọn vẹn.
 *     ⚠ Không xuất-nhập lại được asset CÓ hình học: Export CSV ghi hình
 *       học vào cột ".geo" dạng GeoJSON mà trình nạp CSV của GEE không
 *       đọc được. Muốn sửa hình học phải xuất SHP/GeoJSON và dùng QGIS.
 *  ---------------------------------------------------------------------
 *  v11 thêm DỰ KIẾN SẢN LƯỢNG THU HOẠCH:
 *   [+] Mỗi thửa: sản lượng = diện tích × năng suất giống × hệ số sinh
 *       trưởng (suy từ NDVI đỉnh). Có quy đổi lúa tươi -> lúa khô.
 *   [+] Bảng tổng quan: tổng sản lượng toàn HTX + KẾ HOẠCH THU HOẠCH
 *       THEO ĐỢT (quá hạn / 7 ngày / 8-14 ngày / sau 14 ngày) kèm số
 *       thửa, diện tích, số tấn mỗi đợt — để điều máy gặt, lò sấy,
 *       hẹn thương lái.
 *   [+] Bảng theo dõi có thêm cột "Tấn". CSV xuất thêm 6 cột sản lượng.
 *
 *   ⚠ SẢN LƯỢNG TÍNH THEO DIỆN TÍCH KHAI BÁO (AREA_FOR_YIELD='khai_bao')
 *     vì ranh thửa hiện tại là khung phác họa rộng gấp ~20 lần thực tế.
 *     Dùng diện tích GIS sẽ cho sản lượng sai lệch rất lớn. Sau khi số
 *     hóa lại ranh thửa đúng, đổi sang 'gis' để có số chính xác hơn.
 *  ---------------------------------------------------------------------
 *  v10 SỬA 3 LỖI + bỏ ảnh thật:
 *   [!] "undefined ha": cột diện tích trong asset không có/khác tên.
 *       -> Nay TỰ TÍNH diện tích từ ranh thửa (dt_gis_ha), hiện song song
 *          với diện tích khai báo và cảnh báo nếu lệch > 15%.
 *   [!] Ô Ngày sạ hiện "1776495600000": GEE khi nạp CSV BIẾN cột ngày
 *       thành epoch milliseconds. Date.parse(ms + 'T00:00:00Z') = NaN.
 *       -> parseSowDate() đọc được: epoch ms, epoch giây, YYYY-MM-DD,
 *          DD/MM/YYYY. Ô nhập luôn hiện dạng chuẩn YYYY-MM-DD.
 *   [!] Biểu đồ trống, trục DAS chỉ 94–96: hệ quả của lỗi ngày sạ
 *       (DAS = NaN nên chỉ còn vạch TGST). Đã sửa gốc + thêm chốt chặn
 *       bỏ điểm DAS không hợp lệ và báo rõ khi không vẽ được.
 *   [-] BỎ lớp ảnh thật (RGB). Chỉ còn NDVI (đậm hơn, 85%).
 *  ---------------------------------------------------------------------
 *  DỮ LIỆU: 10 thửa (BT8-01…BT8-10). Các hộ chưa số hóa ranh thửa đã BỎ
 *  hẳn khỏi hệ thống theo yêu cầu.
 *
 *  ASSET DÙNG TRONG APP:
 *    • HTX-ranh-thua : 10 thửa — hình học + thuộc tính (giống, ngày sạ…)
 *    • ranh-xa       : ranh giới xã — lớp NỀN THAM CHIẾU, chỉ hiện khi
 *                      tích vào ô "Hiện ranh xã" ở panel trái.
 *
 *  ⚠ LƯU Ý VỀ CẬP NHẬT: GEE Asset Manager KHÔNG sửa được thuộc tính từng
 *    thửa (chỉ xem / phân quyền). Muốn đổi giống hay ngày sạ thì GHI ĐÈ
 *    asset bằng file CSV mới. Quy trình cho cả HTX:
 *      1. Mở HTX-ranh-thua.csv bằng Excel / Google Sheets.
 *      2. Sửa cột "giong" và "ngay_sa". KHÔNG đụng vào cột "wkt".
 *      3. GEE > Assets > NEW > CSV file > chọn file.
 *         Geometry: chọn cột WKT là "wkt".
 *         Asset ID đặt ĐÚNG BẰNG ASSET_PLOTS bên dưới > Overwrite.
 *      4. Mọi người mở app đều thấy số liệu mới, không ai sửa code.
 *    Người cần cập nhật: cấp quyền Writer trên thư mục asset.
 *
 *  Sửa trong app (form ở thẻ chi tiết) chỉ có tác dụng TRONG PHIÊN, dùng
 *  để thử nhanh. Muốn lưu chung thì theo 4 bước trên.
 * ===================================================================== */

/**** 0. THAM SỐ ====================================================== */
var CLEAR_THR    = 0.60;
var NDVI_HARV    = 0.35;
var NDVI_RIPE    = 0.55;
var VH_HARV_DROP = 3.0;
var SEASON_S     = ee.Date('2026-04-01');
var SEASON_E     = ee.Date(Date.now());
var SCALE        = 10;
var CRS          = 'EPSG:32648';

var BUFFER_M     = 500;
var TL_PERIOD    = 6;     // bước thanh thời gian (ngày)
var TL_PLAY_MS   = 900;   // tốc độ chạy tự động (ms/bước)
var TL_MIN_DAYS  = 12;    // cửa sổ tối thiểu (ngày) — TRÁNH LỖI "Empty date ranges":
                          // filterDate(01/04, 01/04) là khoảng RỖNG -> GEE báo lỗi.
                          // Sentinel-2 lặp 5 ngày, có mây nên cần ~12 ngày mới đủ 1 ảnh sạch.

var VARIETY_DAYS = {'OM 5451':95, 'OM 18':100, 'Đài Thơm 8':100, 'IR 50404':90};
var DEFAULT_DAYS = 95;

/**** NĂNG SUẤT & SẢN LƯỢNG DỰ KIẾN ==================================
 *  Năng suất bình quân vụ HÈ THU theo giống (tấn/ha, lúa TƯƠI tại ruộng).
 *  ĐÂY LÀ SỐ THAM KHẢO chung cho ĐBSCL. HTX nên thay bằng năng suất
 *  THỰC TẾ các vụ trước của chính mình thì ước tính mới sát.
 *  (Hè Thu thường thấp hơn Đông Xuân 1–1.5 tấn/ha do mưa, đổ ngã, sâu bệnh.)
 * ================================================================== */
var YIELD_THA = {'OM 5451':5.8, 'OM 18':6.0, 'Đài Thơm 8':5.9, 'IR 50404':6.3};
var YIELD_DEFAULT = 5.8;
var LUA_KHO_RATE  = 0.80;   // quy đổi lúa tươi -> lúa khô (~80%)

/*  Diện tích dùng để TÍNH SẢN LƯỢNG:
 *    'khai_bao' = diện tích hộ khai báo  (MẶC ĐỊNH — an toàn)
 *    'gis'      = diện tích đo từ ranh thửa
 *  Chỉ chuyển sang 'gis' KHI ranh thửa đã được số hóa đúng. Hiện ranh
 *  trong KMZ là khung phác họa rộng gấp ~20 lần nên dùng 'gis' sẽ cho
 *  sản lượng sai lệch rất lớn.                                        */
var AREA_FOR_YIELD = 'khai_bao';

/*  Hệ số sức sinh trưởng suy từ NDVI đỉnh: [ngưỡng NDVI, hệ số]  */
var VIGOR = [[0.80, 1.05], [0.70, 1.00], [0.60, 0.92], [0.00, 0.85]];

/**** BẢNG SỬA GIỐNG / NGÀY SẠ (ưu tiên hơn giá trị trong KMZ) =========
 *  Cách 1 — SỬA TAY tại đây (lưu qua mọi lần tải lại app):
 *     'BT8-03': {giong:'OM 18', ngay_sa:'2026-04-22'},
 *  Cách 2 — sửa NGAY TRONG APP (form ở thẻ chi tiết) rồi bấm
 *     "⬇ Xuất bảng cập nhật" để lấy đoạn này dán đè vào đây.
 *  Danh sách giống hợp lệ = khóa của VARIETY_DAYS ở trên (thêm giống mới
 *  thì bổ sung vào VARIETY_DAYS kèm số ngày sinh trưởng).
 * =================================================================== */
var META_OVERRIDE = {
  // 'BT8-01': {giong:'OM 5451', ngay_sa:'2026-04-18'},
};

/**** CẤU HÌNH ASSET ================================================== */
/**** THƯƠNG HIỆU NHÓM DỰ THI ======================================== */
var NHOM       = 'RD_AGU';
var DON_VI     = 'Trường Đại học An Giang — ĐHQG-HCM';
var PHU_DE     = 'Sản phẩm dự thi · bản demo';

/*  LOGO — GEE không nạp được PNG, chỉ nhận GeoTIFF. Các bước:
 *    1. Tab Assets > NEW > Image upload (GeoTIFF, single).
 *    2. Chọn file logo_RD_AGU.tif kèm theo bộ mã này.
 *    3. Asset ID đặt: logo_RD_AGU  (hoặc tên khác tuỳ ý).
 *    4. UPLOAD, chờ tác vụ ở tab Tasks xong (~1 phút).
 *    5. Bấm vào asset vừa tạo, sao chép đường dẫn đầy đủ dán vào đây.
 *  Để trống -> app hiện huy hiệu chữ AGU theo tông màu trường.        */
var ASSET_LOGO = 'projects/gen-lang-client-0854910220/assets/logo_RD_AGU';   // vd 'projects/gen-lang-client-0854910220/assets/logo_RD_AGU'

/*  Cảnh báo kỹ thuật về ranh thửa (dùng khi thẩm định số liệu thật).
 *  Đặt false cho bản trình diễn để giao diện gọn.                    */
var SHOW_DATA_WARNINGS = false;

var USE_ASSET  = true;   // false = chạy tạm bằng dữ liệu nhúng trong code
var ASSET_PLOTS= 'projects/gen-lang-client-0854910220/assets/HTX-ranh-thua';
var ASSET_XA   = 'projects/gen-lang-client-0854910220/assets/ranh-xa';
var VU_LOC     = 'Hè Thu 2026';   // lọc theo cột "vu"

/*  PHIẾU CẬP NHẬT NGOÀI APP (tùy chọn nhưng RẤT NÊN dùng khi nhiều
 *  người cùng cập nhật). Tạo 1 Google Form với 3 câu hỏi: Mã thửa,
 *  Giống, Ngày sạ. Câu trả lời tự chảy vào Google Sheet.
 *    • Để trống FORM_URL -> app ẩn nút này.
 *    • Muốn ĐIỀN SẴN: mở Form > ⋮ > "Get pre-filled link", điền thử rồi
 *      lấy link, trong đó có các mã entry.xxxxx — dán vào 3 biến dưới.  */
var FORM_URL      = '';           // vd 'https://docs.google.com/forms/d/e/XXX/viewform'
var FORM_Q_MA     = '';           // vd 'entry.123456789'
var FORM_Q_GIONG  = '';           // vd 'entry.987654321'
var FORM_Q_NGAYSA = '';           // vd 'entry.555555555'

/*  BẢNG THUỘC TÍNH RỜI — ĐÂY LÀ CÁCH CẬP NHẬT ĐƯỢC KHUYẾN NGHỊ.
 *  Asset CSV chỉ gồm: ma_ruong, chu_ho, giong, ngay_sa, vu, dt_csv_ha
 *  (KHÔNG có cột wkt) nên mở Excel sửa rất an toàn, không sợ hỏng hình học.
 *  App ghép theo ma_ruong và ƯU TIÊN giá trị trong bảng này.
 *  Đặt true sau khi đã tải HTX-thuoctinh.csv lên asset.                */
/*  ⚠ ĐỂ false CHO TỚI KHI đã tải HTX-thuoctinh.csv lên asset thành công.
 *  Bật true khi asset chưa tồn tại sẽ làm HỎNG TOÀN BỘ app
 *  ("Collection asset ... not found" + bản đồ trắng).                   */
var USE_META_ASSET = false;
var ASSET_META = 'projects/gen-lang-client-0854910220/assets/HTX-thuoctinh';

var STAGE_COLORS = {
  'Mạ / mới sạ':'#bdbdbd','Đẻ nhánh':'#a1d99b','Làm đòng - Trổ':'#31a354',
  'Chín':'#ff7f00','Đã thu hoạch':'#a65628','Chưa đủ dữ liệu':'#e0e0e0'};
var STAGE_ORDER = ['Mạ / mới sạ','Đẻ nhánh','Làm đòng - Trổ','Chín',
                   'Đã thu hoạch','Chưa đủ dữ liệu'];

/**** 1. THỬA RUỘNG (nhúng sẵn) ====================================== */
// Dự phòng: dùng khi USE_ASSET = false hoặc asset chưa tạo xong.
// Họ tên chủ hộ đã được ẩn danh trong bản công khai.
var FALLBACK_PLOTS = ee.FeatureCollection([
  ee.Feature(ee.Geometry.Polygon([[[105.157328,10.209535],[105.161448,10.205876],[105.163908,10.208803],[105.159903,10.212123],[105.157328,10.209535]]]), {ma_ruong:'BT8-01',chu_ho:'Hộ BT8-01',giong:'OM 5451',vu:'Hè Thu 2026',ngay_sa:'2026-04-18',dt_csv_ha:1.2}),
  ee.Feature(ee.Geometry.Polygon([[[105.176505,10.221555],[105.174421,10.219117],[105.179438,10.215993],[105.181664,10.218739],[105.176505,10.221555]]]), {ma_ruong:'BT8-02',chu_ho:'Hộ BT8-02',giong:'OM 5451',vu:'Hè Thu 2026',ngay_sa:'2026-04-18',dt_csv_ha:0.8}),
  ee.Feature(ee.Geometry.Polygon([[[105.177021,10.23185],[105.179986,10.230178],[105.183652,10.234351],[105.180419,10.236665],[105.177021,10.23185]]]), {ma_ruong:'BT8-03',chu_ho:'Hộ BT8-03',giong:'OM 18',vu:'Hè Thu 2026',ngay_sa:'2026-04-20',dt_csv_ha:2.1}),
  ee.Feature(ee.Geometry.Polygon([[[105.150089,10.223937],[105.145226,10.218422],[105.148423,10.216057],[105.153179,10.221686],[105.150089,10.223937]]]), {ma_ruong:'BT8-04',chu_ho:'Hộ BT8-04',giong:'Đài Thơm 8',vu:'Hè Thu 2026',ngay_sa:'2026-04-22',dt_csv_ha:1.5}),
  ee.Feature(ee.Geometry.Polygon([[[105.145266,10.213304],[105.141211,10.208113],[105.143164,10.206142],[105.147926,10.211005],[105.145266,10.213304]]]), {ma_ruong:'BT8-05',chu_ho:'Hộ BT8-05',giong:'OM 18',vu:'Hè Thu 2026',ngay_sa:'2026-04-20',dt_csv_ha:0.9}),
  ee.Feature(ee.Geometry.Polygon([[[105.145365,10.195383],[105.149892,10.191966],[105.152332,10.194133],[105.147545,10.197935],[105.145365,10.195383]]]), {ma_ruong:'BT8-06',chu_ho:'Hộ BT8-06',giong:'OM 5451',vu:'Hè Thu 2026',ngay_sa:'2026-04-19',dt_csv_ha:1.8}),
  ee.Feature(ee.Geometry.Polygon([[[105.204601,10.22334],[105.202064,10.219363],[105.20622,10.217067],[105.209284,10.220962],[105.204601,10.22334]]]), {ma_ruong:'BT8-07',chu_ho:'Hộ BT8-07',giong:'IR 50404',vu:'Hè Thu 2026',ngay_sa:'2026-04-25',dt_csv_ha:1.1}),
  ee.Feature(ee.Geometry.Polygon([[[105.130543,10.216973],[105.125621,10.212633],[105.127409,10.210815],[105.132262,10.215027],[105.130543,10.216973]]]), {ma_ruong:'BT8-08',chu_ho:'Hộ BT8-08',giong:'Đài Thơm 8',vu:'Hè Thu 2026',ngay_sa:'2026-04-22',dt_csv_ha:0.7}),
  ee.Feature(ee.Geometry.Polygon([[[105.167351,10.183286],[105.165481,10.180621],[105.169495,10.177793],[105.171558,10.180651],[105.167351,10.183286]]]), {ma_ruong:'BT8-09',chu_ho:'Hộ BT8-09',giong:'OM 5451',vu:'Hè Thu 2026',ngay_sa:'2026-04-18',dt_csv_ha:2.4}),
  ee.Feature(ee.Geometry.Polygon([[[105.127443,10.193047],[105.130679,10.190089],[105.135018,10.19454],[105.131631,10.197645],[105.127443,10.193047]]]), {ma_ruong:'BT8-10',chu_ho:'Hộ BT8-10',giong:'OM 18',vu:'Hè Thu 2026',ngay_sa:'2026-04-21',dt_csv_ha:1.3})
]);

/**** 2. DỰNG NGUỒN DỮ LIỆU ========================================== *
 *  ASSET_PLOTS chứa cả hình học lẫn thuộc tính -> dùng thẳng.
 *  Bật USE_META_ASSET thì ghép thêm bảng thuộc tính rời theo ma_ruong.
 *
 *  Toàn bộ chuỗi phụ thuộc (AOI, ảnh S1/S2, mẫu...) gom vào buildData()
 *  để khi asset lỗi, app DỰNG LẠI bằng dữ liệu nhúng thay vì chết hẳn.
 * =================================================================== */
var plots, htPlots, AOI, AOI_VIEW, s2raw, s2, s1, s1raw, ringPlots,
    s2samples, s1samples, ringSamples;
var USING_FALLBACK = false;

function sampleAll(coll, fc, scale){
  return coll.map(function(img){
    return img.reduceRegions({
      collection: fc, reducer: ee.Reducer.mean(), scale: scale
    }).map(function(f){ return f.set('t', img.date().millis()); });
  }).flatten().filter(ee.Filter.notNull(['mean']));
}

function buildData(dungAsset){
  if (dungAsset){
    plots = ee.FeatureCollection(ASSET_PLOTS);
    if (USE_META_ASSET){
      var meta = ee.FeatureCollection(ASSET_META);
      var joined = ee.Join.inner('p','m').apply(
        plots, meta,
        ee.Filter.equals({leftField:'ma_ruong', rightField:'ma_ruong'}));
      plots = ee.FeatureCollection(joined.map(function(f){
        var g = ee.Feature(f.get('p'));
        var t = ee.Feature(f.get('m'));
        return g.set({
          chu_ho:    t.get('chu_ho'),
          giong:     t.get('giong'),
          ngay_sa:   t.get('ngay_sa'),
          vu:        t.get('vu'),
          dt_csv_ha: t.get('dt_csv_ha')
        });
      }));
    }
  } else {
    plots = FALLBACK_PLOTS;
  }

  // Diện tích đo từ ranh thửa (ha)
  plots = plots.map(function(f){
    return f.set('dt_gis_ha',
      f.geometry().area(1).divide(10000).multiply(100).round().divide(100));
  });

  htPlots  = plots.filter(ee.Filter.eq('vu', VU_LOC));
  AOI      = htPlots.geometry().bounds();
  AOI_VIEW = AOI.buffer(1200);

  var csPlus = ee.ImageCollection('GOOGLE/CLOUD_SCORE_PLUS/V1/S2_HARMONIZED');
  s2raw = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
    .filterBounds(AOI_VIEW).filterDate(SEASON_S, SEASON_E)
    .linkCollection(csPlus, ['cs'])
    .map(function(img){
      return img.updateMask(img.select('cs').gte(CLEAR_THR));
    });

  s2 = s2raw.map(function(img){
    return img.normalizedDifference(['B8','B4']).rename('NDVI')
              .copyProperties(img, ['system:time_start']);
  });

  s1raw = ee.ImageCollection('COPERNICUS/S1_GRD')
    .filterBounds(AOI_VIEW).filterDate(SEASON_S, SEASON_E)
    .filter(ee.Filter.eq('instrumentMode','IW'))
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation','VH'))
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation','VV'))
    .filter(ee.Filter.eq('orbitProperties_pass','DESCENDING'))
    .map(function(img){
      var vh = img.select('VH'), vv = img.select('VV');
      var m  = vh.gt(-30).and(vv.gt(-30));
      return vh.addBands(vv).updateMask(m)
               .copyProperties(img, ['system:time_start']);
    });

  // Chuỗi VH dùng cho phân tích từng thửa (giữ nguyên như cũ)
  s1 = s1raw.select('VH');

  ringPlots = htPlots.map(function(f){
    var g = f.geometry();
    return f.setGeometry(g.buffer(BUFFER_M).difference(g, 1));
  });

  s2samples   = sampleAll(s2, htPlots,   SCALE);
  s1samples   = sampleAll(s1, htPlots,   20);
  ringSamples = sampleAll(s2, ringPlots, SCALE);
}

buildData(USE_ASSET);

/**** 5. TIỆN ÍCH CLIENT ============================================= */
function fmtDate(ms){
  var d = new Date(ms), p = function(n){ return (n<10?'0':'')+n; };
  return p(d.getUTCDate())+'/'+p(d.getUTCMonth()+1)+'/'+d.getUTCFullYear();
}
function daysBetween(a,b){ return Math.round((b-a)/86400000); }

// yyyy-mm-dd để hiển thị trong ô nhập + xuất CSV
function fmtISO(ms){
  var d = new Date(ms), p = function(n){ return (n<10?'0':'')+n; };
  return d.getUTCFullYear()+'-'+p(d.getUTCMonth()+1)+'-'+p(d.getUTCDate());
}

/**  ĐỌC NGÀY SẠ TỪ MỌI ĐỊNH DẠNG ------------------------------------
 *  GEE khi nạp CSV thường BIẾN cột ngày thành epoch milliseconds
 *  (vd 2026-04-18 -> 1776495600000). Nếu cứ Date.parse(chuỗi+'T00:00:00Z')
 *  sẽ ra NaN, kéo theo DAS = NaN và biểu đồ trống trơn.
 *  Hàm này nhận: số ms, số giây, '2026-04-18', '18/04/2026'.
 * ------------------------------------------------------------------ */
function parseSowDate(v){
  if (v === null || v === undefined || v === '') return NaN;
  if (typeof v === 'number'){ return v > 1e11 ? v : v*1000; }
  var sv = String(v).trim();
  if (/^\d{10,}$/.test(sv)){ var n = Number(sv); return n > 1e11 ? n : n*1000; }
  var m = sv.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (m) return Date.UTC(Number(m[1]), Number(m[2])-1, Number(m[3]));
  m = sv.match(/^(\d{1,2})[\/-](\d{1,2})[\/-](\d{4})$/);
  if (m) return Date.UTC(Number(m[3]), Number(m[2])-1, Number(m[1]));
  var t = Date.parse(sv);
  return isNaN(t) ? NaN : t;
}

// Diện tích ưu tiên: GIS đo từ ranh thửa -> khai báo -> 0
function areaOf(p){
  var g = Number(p.dt_gis_ha), k = Number(p.dt_csv_ha);
  if (!isNaN(g) && g > 0) return g;
  if (!isNaN(k) && k > 0) return k;
  return 0;
}

// Diện tích dùng riêng cho tính SẢN LƯỢNG (theo cấu hình AREA_FOR_YIELD)
function yieldArea(p){
  var g = Number(p.dt_gis_ha), k = Number(p.dt_csv_ha);
  if (AREA_FOR_YIELD === 'gis' && !isNaN(g) && g > 0) return g;
  if (!isNaN(k) && k > 0) return k;
  return (!isNaN(g) && g > 0) ? g : 0;
}

/**** LƯU CHỈNH SỬA VÀO ĐƯỜNG DẪN (URL) =============================
 *  App đã publish KHÔNG ghi được vào asset. Nhưng ui.url cho phép nhét
 *  chỉnh sửa vào chính thanh địa chỉ. Người dùng sửa xong -> copy link
 *  là ĐÃ LƯU: mở lại link đó (hoặc gửi cho người khác) thì chỉnh sửa
 *  còn nguyên. Đây là cách "ghi nhận" duy nhất chạy được trong app.
 * ================================================================== */
function saveEditsToUrl(){
  if (!(ui.url && ui.url.set)) return;
  var parts = [];
  for (var ma in DB){
    var p = DB[ma].props;
    var ms = parseSowDate(p.ngay_sa);
    parts.push(ma + '~' + p.giong + '~' + (isNaN(ms) ? '' : fmtISO(ms)));
  }
  ui.url.set('sua', parts.join(';'));
}

function loadEditsFromUrl(){
  var out = {};
  if (!(ui.url && ui.url.get)) return out;
  var str = ui.url.get('sua');
  if (!str) return out;
  var recs = String(str).split(';');
  for (var i=0; i<recs.length; i++){
    var f = recs[i].split('~');
    if (f.length >= 3 && f[0]) out[f[0]] = {giong:f[1], ngay_sa:f[2]};
  }
  return out;
}
var URL_EDITS = loadEditsFromUrl();

// Hệ số sức sinh trưởng từ NDVI đỉnh
function vigorOf(peakV){
  for (var i=0; i<VIGOR.length; i++){
    if (peakV >= VIGOR[i][0]) return VIGOR[i][1];
  }
  return 0.85;
}
var NOW  = Date.now();
var DB   = {};
var GEOM = {};

function lastOf(arr){ return arr.length ? arr[arr.length-1] : null; }

/**** 6. TÍNH TRẠNG THÁI ============================================= */
function computeStats(rec){
  var nd = rec.nd, vh = rec.vh, rg = rec.ring, p = rec.props;
  nd.sort(function(a,b){return a[0]-b[0];});
  vh.sort(function(a,b){return a[0]-b[0];});
  rg.sort(function(a,b){return a[0]-b[0];});

  var saMs = parseSowDate(p.ngay_sa);
  var dur  = VARIETY_DAYS[p.giong] || DEFAULT_DAYS;
  var harvMs = saMs + dur*86400000;

  var peakV=-1, peakMs=null, maxGap=0;
  for (var i=0;i<nd.length;i++){
    if (nd[i][1]>peakV){ peakV=nd[i][1]; peakMs=nd[i][0]; }
    if (i>0){ var g=daysBetween(nd[i-1][0],nd[i][0]); if(g>maxGap) maxGap=g; }
  }
  var last = lastOf(nd);
  var lastV = last ? last[1] : null, lastMs = last ? last[0] : null;

  var vhPeak=-99;
  for (var j=0;j<vh.length;j++){ if (vh[j][1]>vhPeak) vhPeak=vh[j][1]; }
  var vlast = lastOf(vh);
  var vhLast = vlast ? vlast[1] : null, vhLastMs = vlast ? vlast[0] : null;
  var vhDrop = (vhLast!==null && vhPeak>-99) ? (vhPeak-vhLast) : null;

  // --- so với vùng xung quanh: lấy quan trắc vành đai GẦN NHẤT cùng thời điểm ---
  var ringV = null, ringDiff = null, ringMsg = '';
  if (lastMs !== null && rg.length){
    var best = null, bd = 1e9;
    for (var k=0;k<rg.length;k++){
      var d0 = Math.abs(rg[k][0]-lastMs);
      if (d0 < bd){ bd = d0; best = rg[k]; }
    }
    if (best && bd <= 3*86400000){        // cùng ngày chụp (±3 ngày)
      ringV = best[1];
      ringDiff = lastV - ringV;
      if (ringDiff < -0.10) ringMsg = 'Thửa CHÍN/GẶT SỚM hơn ruộng lân cận';
      else if (ringDiff > 0.10) ringMsg = 'Thửa CÒN XANH hơn lân cận — chín muộn';
      else ringMsg = 'Tương đồng ruộng lân cận';
    }
  }

  var dasNow  = daysBetween(saMs, NOW);
  var dasPeak = peakMs ? daysBetween(saMs, peakMs) : null;
  var dasLast = lastMs ? daysBetween(saMs, lastMs) : null;
  var ageObs  = lastMs ? daysBetween(lastMs, NOW) : null;

  var stage, note;
  if (nd.length < 3){
    stage='Chưa đủ dữ liệu'; note='Chỉ '+nd.length+' ảnh sạch — mây che nhiều.';
  } else if (peakV>0.55 && lastV<NDVI_HARV){
    stage='Đã thu hoạch'; note='NDVI rơi xuống '+lastV.toFixed(2)+' sau đỉnh '+peakV.toFixed(2)+'.';
  } else if (peakV>0.55 && dasLast>dasPeak && lastV<NDVI_RIPE){
    stage='Chín'; note='NDVI giảm mạnh từ đỉnh — cận thu hoạch.';
  } else if (peakV>0.55 && dasLast>dasPeak){
    stage='Chín'; note='Đã qua đỉnh NDVI (DAS '+dasPeak+'), bắt đầu vàng lá.';
  } else if (lastV>=0.65){
    stage='Làm đòng - Trổ'; note='Tán lá dày, giai đoạn sinh sản.';
  } else if (lastV>=0.45){
    stage='Đẻ nhánh'; note='Tán lá đang phát triển.';
  } else {
    stage='Mạ / mới sạ'; note='NDVI thấp — ruộng còn nhiều nước/đất trống.';
  }

  var alert='', prio=9, overdue = dasNow - dur;
  if (stage==='Đã thu hoạch'){ alert='Đã gặt'; prio=8; }
  else if (nd.length<3){ alert='Thiếu dữ liệu'; prio=3; }
  else if (overdue>0 && !(vhDrop!==null && vhDrop>VH_HARV_DROP)){
    alert='KHẨN: quá hạn '+overdue+'n'; prio=0;
  } else if (overdue>0){ alert='Quá hạn, radar báo đã gặt'; prio=6; }
  else if (overdue>=-7){ alert='Sắp gặt ('+(-overdue)+'n)'; prio=1; }
  else if (ageObs!==null && ageObs>15){ alert='Ảnh cũ '+ageObs+'n'; prio=4; }
  else { alert='Bình thường'; prio=7; }

  // --- SẢN LƯỢNG DỰ KIẾN ---
  var nsGiong  = YIELD_THA[p.giong] || YIELD_DEFAULT;   // tấn/ha
  var haTinh   = yieldArea(p);
  var hesoV    = (peakV > 0) ? vigorOf(peakV) : 1.0;
  var slTuoi   = haTinh * nsGiong * hesoV;              // tấn lúa tươi
  var slKho    = slTuoi * LUA_KHO_RATE;                 // tấn lúa khô

  rec.stats = {nsGiong:nsGiong, haTinh:haTinh, hesoV:hesoV,
    slTuoi:slTuoi, slKho:slKho,
    saMs:saMs, dur:dur, harvMs:harvMs, dasNow:dasNow,
    peakV:peakV, peakMs:peakMs, dasPeak:dasPeak,
    lastV:lastV, lastMs:lastMs, dasLast:dasLast, ageObs:ageObs,
    vhPeak:vhPeak, vhLast:vhLast, vhLastMs:vhLastMs, vhDrop:vhDrop,
    ringV:ringV, ringDiff:ringDiff, ringMsg:ringMsg,
    maxGap:maxGap, nObs:nd.length, nVh:vh.length, nRing:rg.length,
    stage:stage, note:note, alert:alert, prio:prio, overdue:overdue};
  return rec;
}

/**** 5b. COMPOSITE "TÍNH ĐẾN NGÀY T" (cho thanh thời gian) =========== */
// Mỗi pixel = lần quan trắc SẠCH gần nhất trong [đầu vụ, T]. Không lỗ mây.
function compositeAsOf(endMs){
  // Chốt chặn: đầu mốc phải cách đầu vụ >= TL_MIN_DAYS, nếu không khoảng
  // thời gian rỗng và GEE báo "Empty date ranges not supported".
  var minMs = SEASON_S_MS + TL_MIN_DAYS*86400000;
  var safeEnd = Math.max(endMs, minMs);
  var coll = s2raw.filterDate(SEASON_S, ee.Date(safeEnd));
  var withT = coll.map(function(img){
    var t = ee.Image.constant(img.date().millis()).rename('tms').toFloat();
    return img.addBands(t).updateMask(img.select('B8').mask());
  });
  return withT.qualityMosaic('tms');
}


/**** ============== CÁC LỚP CHỈ SỐ HIỂN THỊ TRÊN BẢN ĐỒ ============== *
 *  NDVI bão hoà khi sinh khối cao (lúa trổ 0.75–0.92) nên cả vùng cùng
 *  một sắc xanh. Bổ sung các chỉ số tách được sắc thái:
 *    NDRE  — red-edge, không bão hoà -> phân biệt lúa xanh đậm/nhạt
 *    PSRI  — chỉ số lão hoá, cao = vàng lá -> đúng thứ cần cho vụ chín
 *    LSWI  — độ ẩm/ngập -> tách ruộng đã gặt, đất trống
 *    VH    — radar, xuyên mây
 *    RVI   — chỉ số thực vật radar 4·VH/(VV+VH), chuẩn hoá
 * =================================================================== */
/*  BẢNG MÀU
 *  Dùng bảng TUẦN TỰ (sequential) cho các đại lượng chỉ có "ít → nhiều".
 *  Bảng PHÂN KỲ (diverging) chỉ dùng cho LSWI vì mốc 0 thật sự có nghĩa
 *  (âm = đất khô, dương = còn nước).                                   */
var PAL_VIGOR = ['#FFFFE5','#F7FCB9','#D9F0A3','#ADDD8E',
                 '#78C679','#41AB5D','#238443','#005A32'];   // ít → nhiều lá
var PAL_RIPE  = ['#1A9850','#66BD63','#A6D96A','#D9EF8B',
                 '#FEE08B','#FDAE61','#F46D43','#D73027'];   // xanh → vàng → đỏ
var PAL_WET   = ['#8C510A','#BF812D','#DFC27D','#F6E8C3',
                 '#C7EAE5','#80CDC1','#35978F','#01665E'];   // khô ↔ ướt
var PAL_SAR   = ['#440154','#414487','#2A788E','#22A884',
                 '#7AD151','#FDE725'];                        // viridis

var LAYERS = [
  'NDVI — sức sống tán lá',
  'NDRE — chống bão hoà (rõ nhất)',
  'PSRI — lão hoá / vàng lá',
  'LSWI — độ ẩm & ruộng đã gặt',
  'SAR VH — radar xuyên mây',
  'SAR RVI — thực vật radar'
];
var LAYER = LAYERS[1];

// Khoảng dự phòng, chỉ dùng khi chưa tính xong phần trăm vị
var FALLBACK_VIS = {};
FALLBACK_VIS[LAYERS[0]] = {min:0.30, max:0.90, palette:PAL_VIGOR, div:false};
FALLBACK_VIS[LAYERS[1]] = {min:0.20, max:0.48, palette:PAL_VIGOR, div:false};
FALLBACK_VIS[LAYERS[2]] = {min:-0.05,max:0.20, palette:PAL_RIPE,  div:false};
FALLBACK_VIS[LAYERS[3]] = {min:-0.30,max:0.40, palette:PAL_WET,   div:true};
FALLBACK_VIS[LAYERS[4]] = {min:-20,  max:-9,   palette:PAL_SAR,   div:false};
FALLBACK_VIS[LAYERS[5]] = {min:0.25, max:0.95, palette:PAL_SAR,   div:false};

var NOTE = {};
NOTE[LAYERS[0]] = 'Xanh đậm = tán dày. Dễ bão hoà khi lúa trổ.';
NOTE[LAYERS[1]] = 'Red-edge: tách được lúa xanh đậm với xanh nhạt.';
NOTE[LAYERS[2]] = 'Vàng → đỏ = lá đang lão hoá, lúa vào chín.';
NOTE[LAYERS[3]] = 'Nâu = đất khô hoặc đã gặt · xanh = ruộng còn nước.';
NOTE[LAYERS[4]] = 'Sáng = tán lúa dày. Gặt xong VH sụt mạnh.';
NOTE[LAYERS[5]] = 'Sáng = sinh khối lớn. Không phụ thuộc mây.';

// Ảnh chỉ số (1 band tên 'v') theo lớp đang chọn, tính đến mốc T
function layerImage(endMs){
  var comp = compositeAsOf(endMs);
  if (LAYER === LAYERS[0]) return comp.normalizedDifference(['B8','B4']).rename('v');
  if (LAYER === LAYERS[1]) return comp.normalizedDifference(['B8A','B5']).rename('v');
  if (LAYER === LAYERS[2]){
    return comp.expression('(R - B) / RE', {
      R: comp.select('B4'), B: comp.select('B2'), RE: comp.select('B6')
    }).rename('v');
  }
  if (LAYER === LAYERS[3]) return comp.normalizedDifference(['B8','B11']).rename('v');

  var sar = s1raw.filterDate(SEASON_S, ee.Date(Math.max(endMs,
              SEASON_S_MS + TL_MIN_DAYS*86400000)));
  if (LAYER === LAYERS[4]) return sar.select('VH').mean().rename('v');
  return sar.map(function(im){
    var vh = ee.Image(10).pow(im.select('VH').divide(10));
    var vv = ee.Image(10).pow(im.select('VV').divide(10));
    return vh.multiply(4).divide(vv.add(vh)).rename('v');
  }).mean().rename('v');
}

/**** TỰ GIÃN MÀU THEO DỮ LIỆU THẬT ================================== *
 *  Đặt min/max bằng tay luôn hoặc quá rộng (mất tương phản) hoặc quá
 *  hẹp (cháy màu). Lấy phần trăm vị 2% và 98% của chính ảnh trong vùng
 *  đang xem thì dải màu luôn phủ đúng khoảng giá trị thực -> tách được
 *  sắc thái giữa các thửa. Kết quả được nhớ lại theo lớp + mốc thời gian.
 * =================================================================== */
var stretchCache = {};

function visFor(img, cb){
  var key = LAYER + '|' + Math.round(TL_END_MS/86400000/6);
  var fb  = FALLBACK_VIS[LAYER];
  if (stretchCache[key]){ cb(stretchCache[key], true); return; }
  img.reduceRegion({
    reducer: ee.Reducer.percentile([2, 98]),
    geometry: AOI_VIEW, scale: 60, maxPixels: 1e9, bestEffort: true
  }).evaluate(function(r, err){
    if (err || !r) return;
    var lo = r.v_p2, hi = r.v_p98;
    if (lo === null || hi === null || lo === undefined || hi === undefined) return;
    if (!(hi - lo > 1e-6)) return;
    var vis;
    if (fb.div){                              // giữ mốc 0 ở giữa dải màu
      var m = Math.max(Math.abs(lo), Math.abs(hi));
      vis = {min:-m, max:m, palette:fb.palette};
    } else {
      vis = {min:lo, max:hi, palette:fb.palette};
    }
    stretchCache[key] = vis;
    cb(vis, true);
  });
}

/**** 6b. GIAO DIỆN + TRẠNG THÁI ===================================== */
/**** ================= HỆ THIẾT KẾ GIAO DIỆN ========================= *
 *  Bảng màu, thang chữ và các khối dựng sẵn (thẻ, chỉ số, hàng, thanh)
 *  để toàn app dùng chung một ngôn ngữ hình ảnh.
 * =================================================================== */
var C = {
  primary:  '#12703C',   // xanh lúa — màu chủ đạo
  primaryLt:'#E8F3EC',
  accent:   '#0D47A1',   // xanh AGU
  accentLt: '#E8EEF9',
  warn:     '#E65100',
  warnLt:   '#FFF3E6',
  danger:   '#C62828',
  ink:      '#1F2933',   // chữ chính
  muted:    '#6B7A8C',   // chữ phụ
  faint:    '#9AA7B4',
  line:     '#E2E8F0',
  surface:  '#FFFFFF',
  surfaceAlt:'#F6F8FB'
};

var T = {
  h1:'19px', h2:'13px', h3:'11px',
  body:'11px', small:'10px', tiny:'9px'
};

// Thẻ có viền — khối gom nội dung
function card(){
  return ui.Panel({style:{
    backgroundColor:C.surface, border:'1px solid '+C.line,
    padding:'8px 10px', margin:'0 0 8px 0'
  }});
}

// Tiêu đề mục: chữ nhỏ, in hoa, có gạch màu bên trái
function sectionHead(txt){
  var p = ui.Panel({layout:ui.Panel.Layout.flow('horizontal'),
    style:{margin:'0 0 6px 0', padding:'0px'}});
  p.add(ui.Label('', {backgroundColor:C.primary, padding:'0 1px',
    margin:'1px 6px 1px 0', height:'13px'}));
  p.add(ui.Label(txt, {fontWeight:'bold', fontSize:T.h3, color:C.primary,
    margin:'0px', padding:'0px'}));
  return p;
}

// Hàng nhãn — giá trị
function kv(k, v, color, bold){
  var p = ui.Panel({layout:ui.Panel.Layout.flow('horizontal'),
    style:{margin:'0px', padding:'0px'}});
  p.add(ui.Label(k, {fontSize:T.body, width:'138px', color:C.muted,
    margin:'2px 0', padding:'0px'}));
  p.add(ui.Label(v, {fontSize:T.body, color:color||C.ink, margin:'2px 0',
    padding:'0px', fontWeight: bold?'bold':'normal'}));
  return p;
}

// Ô chỉ số lớn (KPI)
function kpi(val, unit, label, color){
  var p = ui.Panel({style:{
    backgroundColor:C.surfaceAlt, border:'1px solid '+C.line,
    padding:'6px 4px', margin:'0 4px 0 0', width:'112px'}});
  var top = ui.Panel({layout:ui.Panel.Layout.flow('horizontal'),
    style:{margin:'0px', padding:'0px'}});
  top.add(ui.Label(val, {fontSize:'17px', fontWeight:'bold',
    color:color||C.primary, margin:'0px', padding:'0px'}));
  if (unit){
    top.add(ui.Label(unit, {fontSize:T.small, color:C.muted,
      margin:'6px 0 0 3px', padding:'0px'}));
  }
  p.add(top);
  p.add(ui.Label(label, {fontSize:T.tiny, color:C.muted,
    margin:'0px', padding:'0px'}));
  return p;
}

// Thanh tỷ lệ nằm ngang (dài tối đa 150px)
function bar(pct, color){
  var w = Math.max(2, Math.round(pct*1.5));
  var p = ui.Panel({layout:ui.Panel.Layout.flow('horizontal'),
    style:{margin:'0px', padding:'0px', backgroundColor:C.line, width:'150px'}});
  p.add(ui.Label('', {backgroundColor:color, padding:'0px',
    margin:'0px', width:w+'px', height:'8px'}));
  return p;
}

// Vạch phân cách
function divider(){
  return ui.Label('', {backgroundColor:C.line, padding:'0px',
    margin:'6px 0', height:'1px', stretch:'horizontal'});
}

ui.root.clear();
var map = ui.Map();
map.setOptions('HYBRID');
map.centerObject(AOI_VIEW, 13);
map.style().set('cursor','crosshair');

// --- Trạng thái ứng dụng ---
var layerNote = null;        // nhãn mô tả lớp (gán khi dựng chân trang)
var MODE = 'overview';       // 'overview' | 'detail'
var SELECTED = null;         // ma_ruong đang chọn
var showXa = false;          // hiện lớp ranh xã
var showLabels = true;       // hiện nhãn mã thửa trên bản đồ
var SEASON_S_MS = Date.parse('2026-04-01T00:00:00Z');
var TL_END_MS = Date.now();  // mốc thời gian đang xem
var TOTAL_DAYS = daysBetween(SEASON_S_MS, Date.now());
var playing = false, playTimer = null;

var panel = ui.Panel({style:{width:'410px', padding:'12px 14px',
  backgroundColor:C.surface}});
/**** ĐẦU TRANG — THƯƠNG HIỆU & ĐIỀU HƯỚNG ========================== */
var brand = ui.Panel({layout: ui.Panel.Layout.flow('horizontal'),
  style:{margin:'0px', padding:'0px', backgroundColor:C.surface}});

if (ASSET_LOGO && ASSET_LOGO.length > 10){
  /*  QUAN TRỌNG — chống mờ logo:
   *  Nếu đặt dimensions bằng đúng cỡ hiển thị (vd '54x54') thì GEE thu
   *  nhỏ ảnh NGAY TRÊN SERVER bằng phép nội suy thô -> vòng chữ quanh
   *  logo nát thành vệt mờ. Cách đúng: LẤY ẢNH Ở ĐỘ PHÂN GIẢI ĐẦY ĐỦ
   *  (512) rồi để TRÌNH DUYỆT thu nhỏ về 64px — trình duyệt lọc mượt
   *  hơn hẳn nên chữ vẫn sắc.
   *  select([0,1,2]) lấy band theo chỉ số nên không phụ thuộc tên band. */
  brand.add(ui.Thumbnail({
    image: ee.Image(ASSET_LOGO).select([0,1,2]).visualize({min:0, max:255}),
    params: {dimensions:'512x512', format:'png'},
    style: {height:'64px', width:'64px', margin:'0 10px 0 0', padding:'0px'}
  }));
} else {
  // Chưa tải logo -> huy hiệu dựng bằng khối màu, theo đúng tông logo trường
  var emblem = ui.Panel({style:{backgroundColor:'#FFEB3B',
    border:'2px solid #00A651', padding:'8px 0 7px 0',
    margin:'0 10px 0 0', width:'64px', textAlign:'center'}});
  emblem.add(ui.Label('AGU', {fontWeight:'bold', fontSize:'19px',
    color:'#0D47A1', margin:'0px', padding:'0px', textAlign:'center',
    stretch:'horizontal', backgroundColor:'#FFEB3B'}));
  emblem.add(ui.Label('1999', {fontWeight:'bold', fontSize:'10px',
    color:'#D32F2F', margin:'0px', padding:'0px', textAlign:'center',
    stretch:'horizontal', backgroundColor:'#FFEB3B'}));
  brand.add(emblem);
}

var brandTxt = ui.Panel({style:{margin:'0px', padding:'0px'}});
brandTxt.add(ui.Label('NHÓM ' + NHOM, {fontWeight:'bold', fontSize:'15px',
  color:C.accent, margin:'0px', padding:'0px'}));
brandTxt.add(ui.Label(DON_VI, {fontSize:T.small, color:C.primary,
  margin:'1px 0 0 0', padding:'0px'}));
brandTxt.add(ui.Label(PHU_DE, {fontSize:T.tiny, color:C.faint,
  margin:'0px', padding:'0px'}));
brand.add(brandTxt);
panel.add(brand);

panel.add(ui.Label('', {backgroundColor:C.primary, padding:'0px',
  margin:'8px 0 8px 0', height:'2px', stretch:'horizontal'}));

panel.add(ui.Label('GIÁM SÁT LÚA HÈ THU 2026',
  {fontWeight:'bold', fontSize:T.h1, color:C.primary,
   margin:'0px', padding:'0px'}));
panel.add(ui.Label('HTX Vọng Đông · Bình Thành 8 · Thoại Sơn, An Giang',
  {fontSize:T.body, color:C.muted, margin:'2px 0 6px 0', padding:'0px'}));

var statusLbl = ui.Label('Đang tải ảnh và chỉ số…',
  {fontSize:T.small, color:C.faint, margin:'0 0 8px 0', padding:'0px'});
panel.add(statusLbl);

var mainPanel = ui.Panel();
panel.add(mainPanel);

/**** CHÂN TRANG — LỚP NỀN, CHÚ GIẢI, GHI CÔNG ======================= */
var footer = ui.Panel({style:{margin:'8px 0 0 0', padding:'0px'}});

footer.add(ui.Label('', {backgroundColor:C.line, padding:'0px',
  margin:'0 0 6px 0', height:'1px', stretch:'horizontal'}));

footer.add(ui.Label('LỚP HIỂN THỊ TRÊN BẢN ĐỒ', {fontWeight:'bold',
  fontSize:T.h3, color:C.muted, margin:'0 0 3px 0'}));
var layerSel = ui.Select({items:LAYERS, value:LAYER,
  style:{width:'368px', fontSize:T.small, margin:'0 0 2px 0'},
  onChange:function(v){ LAYER = v; redraw(); }});
footer.add(layerSel);
layerNote = ui.Label('', {fontSize:T.tiny, color:C.faint,
  margin:'0 0 5px 0'});
footer.add(layerNote);

var opts = ui.Panel({layout: ui.Panel.Layout.flow('horizontal'),
  style:{margin:'0 0 6px 0', padding:'0px'}});
var lbCheck = ui.Checkbox({label:'Nhãn mã thửa', value:true,
  style:{fontSize:T.body, margin:'0 12px 0 0'},
  onChange:function(v){ showLabels = v; redraw(); }});
var xaCheck = ui.Checkbox({label:'Ranh giới xã', value:false,
  style:{fontSize:T.body, margin:'0px'},
  onChange:function(v){ showXa = v; redraw(); }});
opts.add(lbCheck); opts.add(xaCheck);
footer.add(opts);

footer.add(ui.Label('CHÚ GIẢI GIAI ĐOẠN', {fontWeight:'bold', fontSize:T.h3,
  color:C.muted, margin:'0 0 4px 0'}));
var legendRows = {};
var legendGrid = ui.Panel({layout: ui.Panel.Layout.flow('horizontal', true),
  style:{margin:'0px', padding:'0px'}});
STAGE_ORDER.forEach(function(k){
  var r = ui.Panel({layout: ui.Panel.Layout.flow('horizontal'),
    style:{margin:'0 8px 2px 0', padding:'0px'}});
  r.add(ui.Label('', {backgroundColor: STAGE_COLORS[k], padding:'0 5px',
    margin:'2px 4px 2px 0', height:'10px'}));
  var lab = ui.Label(k, {fontSize:T.small, color:C.ink, margin:'0px',
    padding:'0px'});
  r.add(lab); legendRows[k]=lab; legendGrid.add(r);
});
footer.add(legendGrid);
footer.add(ui.Label('Nền NDVI: đỏ = đất trống hoặc đã gặt · xanh = lúa đang xanh',
  {fontSize:T.tiny, color:C.faint, margin:'3px 0 0 0'}));

footer.add(ui.Label('', {backgroundColor:C.line, padding:'0px',
  margin:'8px 0 5px 0', height:'1px', stretch:'horizontal'}));
footer.add(ui.Label('Nhóm ' + NHOM + ' · ' + DON_VI,
  {fontSize:T.small, color:C.accent, fontWeight:'bold', margin:'0px'}));
footer.add(ui.Label('Nguồn: Sentinel-2 & Sentinel-1 (Copernicus/ESA) · ' +
  'Nền tảng Google Earth Engine',
  {fontSize:T.tiny, color:C.faint, margin:'1px 0 0 0'}));
footer.add(ui.Label('Bản demo trình bày ý tưởng — số liệu cần đối chiếu thực địa ' +
  'trước khi dùng cho quyết định sản xuất.',
  {fontSize:T.tiny, color:C.faint, margin:'1px 0 6px 0'}));
panel.add(footer);

/**** 7b. VẼ LẠI BẢN ĐỒ (thống nhất) ================================= */
function isNowMark(){ return (Date.now() - TL_END_MS) < 7*86400000; }

function redraw(){
  map.layers().reset();
  var region = (MODE==='detail' && SELECTED)
      ? ee.Geometry(GEOM[SELECTED]).buffer(BUFFER_M) : AOI_VIEW;

  // ---- Lớp chỉ số nền (vị trí 0, thay tại chỗ khi giãn màu xong) ----
  var img = layerImage(TL_END_MS).clip(region);
  var ten = LAYER.split(' — ')[0];
  var nhan = ten + ' · ' + fmtDate(TL_END_MS);
  map.layers().add(ui.Map.Layer(img, FALLBACK_VIS[LAYER], nhan, true, 0.88));
  if (layerNote) layerNote.setValue(NOTE[LAYER]);
  visFor(img, function(vis, daGian){
    if (map.layers().length() > 0){
      map.layers().set(0, ui.Map.Layer(img, vis, nhan, true, 0.88));
    }
    if (daGian && layerNote){
      layerNote.setValue(NOTE[LAYER] + '  (dải màu ' +
        (Math.abs(vis.min)<10 ? vis.min.toFixed(2) : vis.min.toFixed(0)) + ' – ' +
        (Math.abs(vis.max)<10 ? vis.max.toFixed(2) : vis.max.toFixed(0)) + ')');
    }
  });

  // ---- Ranh xã (tuỳ chọn) ----
  if (showXa){
    var xa = ee.FeatureCollection(ASSET_XA).filterBounds(AOI_VIEW);
    map.addLayer(ee.Image().byte().paint(xa, 0, 2),
      {palette:['#FF6D00']}, 'Ranh xã', true);
  }

  // ---- Làm nổi 10 thửa: viền đen dày bên dưới + viền trắng bên trên ----
  map.addLayer(ee.Image().byte().paint(htPlots, 0, 5),
    {palette:['#000000']}, 'Viền thửa (nền)', true, 0.55);
  map.addLayer(ee.Image().byte().paint(htPlots, 0, 2),
    {palette:['#FFFFFF']}, 'Ranh 10 thửa', true);

  // ---- Tô màu giai đoạn (chỉ ở mốc hiện tại) ----
  var now = isNowMark();
  STAGE_ORDER.forEach(function(st){
    var geoms = [];
    for (var ma in DB){ if (DB[ma].stats && DB[ma].stats.stage===st)
      geoms.push(ee.Feature(ee.Geometry(GEOM[ma]))); }
    if (legendRows[st]) legendRows[st].setValue(st + '  (' + geoms.length + ')');
    if (now && geoms.length){
      map.addLayer(ee.FeatureCollection(geoms), {color: STAGE_COLORS[st]},
        st + ' (' + geoms.length + ')', true, 0.42);
    }
  });

  // ---- Nhãn mã thửa ----
  if (showLabels) drawLabels();

  if (MODE==='detail' && SELECTED){
    var g = ee.Geometry(GEOM[SELECTED]);
    var ring = g.buffer(BUFFER_M).difference(g, 1);
    map.addLayer(ee.Image().byte().paint(ee.FeatureCollection([ee.Feature(ring)]), 0, 2),
      {palette:['#00E5FF']}, 'Vùng so sánh', true);
    map.addLayer(ee.Image().byte().paint(ee.FeatureCollection([ee.Feature(g)]), 0, 5),
      {palette:['#FFEE00']}, 'Thửa ' + SELECTED, true);
  }
}

/**** NHÃN MÃ THỬA TRÊN BẢN ĐỒ ======================================= *
 *  GEE không vẽ chữ sẵn. Dùng gói cộng đồng users/gena/packages:text
 *  để dựng chữ thành ảnh. Bọc trong try/catch: nếu môi trường không nạp
 *  được gói thì app vẫn chạy bình thường, chỉ mất nhãn.
 * =================================================================== */
var textPkg = null;
try { textPkg = require('users/gena/packages:text'); } catch (e) { textPkg = null; }

var labelLayer = null;

/*  Cỡ chữ phải quy đổi theo mức phóng bản đồ.
 *  gena text vẽ chữ cao fontSize pixel, mỗi pixel = scale mét trên đất.
 *  Muốn chữ cao KHOẢNG 20 pixel màn hình:
 *      scale = (mét trên mỗi pixel màn hình) x 20 / fontSize
 *  Bản v23 để scale=6 với fontSize=18 -> chữ chỉ ~6 pixel, không đọc nổi. */
var LABEL_FONT = 32;
function labelScale(){
  var z = map.getZoom() || 13;
  var mpp = 156543.03 * Math.cos(10.2 * Math.PI/180) / Math.pow(2, z);
  return Math.max(0.5, mpp * 20 / LABEL_FONT);
}

function drawLabels(){
  if (!textPkg) return;
  var sc = labelScale();
  var imgs = [];
  for (var ma in DB){
    if (!GEOM[ma]) continue;
    var c  = ee.Geometry(GEOM[ma]).centroid(1);
    var xy = ee.List(c.coordinates());
    // nhích nhãn lên phía trên tâm thửa để không đè lên phần tô màu
    var pt = ee.Geometry.Point([
      ee.Number(xy.get(0)),
      ee.Number(xy.get(1)).add(sc * LABEL_FONT / 111320 * 0.9)
    ]);
    imgs.push(textPkg.draw(ma.replace('BT8-',''), pt, sc, {
      fontSize: LABEL_FONT, fontType: 'Consolas',
      textColor: '111111', textOpacity: 1,
      outlineColor: 'FFFFFF', outlineWidth: 3, outlineOpacity: 0.95
    }));
  }
  if (!imgs.length) return;
  labelLayer = ui.Map.Layer(ee.ImageCollection(imgs).mosaic(), {}, 'Nhãn thửa', true);
  map.layers().add(labelLayer);
}

// Đổi mức phóng -> vẽ lại nhãn cho đúng cỡ (chỉ thay lớp nhãn, không vẽ lại cả bản đồ)
map.onChangeZoom(function(){
  if (!showLabels || !textPkg) return;
  if (labelLayer) map.layers().remove(labelLayer);
  drawLabels();
});

/**** 8b. THANH THỜI GIAN — GỌN, THU ĐƯỢC ========================== *
 *  Mặc định chỉ hiện một dòng: ngày + nút lùi/tới. Bấm mũi tên để mở
 *  thanh trượt khi cần tua nhanh. Trả lại phần lớn diện tích bản đồ.
 * =================================================================== */
var tlOpen = false;

var tlDateLbl = ui.Label('', {fontWeight:'bold', fontSize:'11px',
  color:C.primary, margin:'3px 6px 0 0', padding:'0px'});
var tlInfoLbl = ui.Label('', {fontSize:'9px', color:C.faint,
  margin:'0 0 0 2px', padding:'0px'});

var tlSlider = ui.Slider({min:TL_MIN_DAYS, max:TOTAL_DAYS, value:TOTAL_DAYS,
  step:TL_PERIOD, style:{width:'214px', margin:'2px 0 0 0', padding:'0px'}});

function tlLabel(){
  var das = Math.round((TL_END_MS - SEASON_S_MS)/86400000);
  tlDateLbl.setValue(fmtDate(TL_END_MS) + (isNowMark() ? ' · nay' : ''));
  tlInfoLbl.setValue('ngày ' + das + ' của vụ');
  s2raw.filterDate(SEASON_S, ee.Date(Math.max(TL_END_MS,
        SEASON_S_MS + TL_MIN_DAYS*86400000))).size().evaluate(function(n){
    if (n === null || n === undefined) return;
    tlInfoLbl.setValue('ngày ' + das + ' · ' + n + ' ảnh' +
      (isNowMark() ? '' : ' · màu giai đoạn ẩn'));
  });
}

tlSlider.onChange(function(v){
  TL_END_MS = SEASON_S_MS + v*86400000;
  if (TL_END_MS > Date.now()) TL_END_MS = Date.now();
  tlLabel(); redraw();
});

function jumpTo(dayOffset){
  var v = Math.max(TL_MIN_DAYS, Math.min(TOTAL_DAYS, dayOffset));
  tlSlider.setValue(v, true);
}
function stepBy(d){
  stopPlay();
  jumpTo(Math.round((TL_END_MS - SEASON_S_MS)/86400000) + d);
}

var BSTY = {padding:'0px 4px', margin:'1px 1px 0 1px', fontSize:'10px'};
var btnPrev = ui.Button({label:'◀', style:BSTY,
  onClick:function(){ stepBy(-TL_PERIOD); }});
var btnNext = ui.Button({label:'▶', style:BSTY,
  onClick:function(){ stepBy(TL_PERIOD); }});
var btnNow  = ui.Button({label:'Nay', style:BSTY,
  onClick:function(){ stopPlay(); jumpTo(TOTAL_DAYS); }});
var btnPlay = ui.Button({label:'▷', style:BSTY,
  onClick:function(){ togglePlay(); }});

var tlExtra = ui.Panel({style:{margin:'0px', padding:'0px', shown:false}});
var tlRow2 = ui.Panel({layout: ui.Panel.Layout.flow('horizontal'),
  style:{margin:'0px', padding:'0px'}});
tlRow2.add(ui.Button({label:'⏮', style:BSTY,
  onClick:function(){ stopPlay(); jumpTo(TL_MIN_DAYS); }}));
tlRow2.add(tlSlider);
tlRow2.add(btnPlay);
tlExtra.add(tlRow2);
tlExtra.add(tlInfoLbl);

var btnMore = ui.Button({label:'⌄', style:BSTY,
  onClick:function(){
    tlOpen = !tlOpen;
    tlExtra.style().set('shown', tlOpen);
    btnMore.setLabel(tlOpen ? '⌃' : '⌄');
  }});

function stopPlay(){ playing=false; btnPlay.setLabel('▷'); }
function togglePlay(){
  if (playing){ stopPlay(); return; }
  playing = true; btnPlay.setLabel('❚❚');
  var cur = Math.round((TL_END_MS - SEASON_S_MS)/86400000);
  if (cur >= TOTAL_DAYS) cur = TL_MIN_DAYS;
  var step = function(){
    if (!playing) return;
    cur += TL_PERIOD;
    if (cur >= TOTAL_DAYS){ jumpTo(TOTAL_DAYS); stopPlay(); return; }
    jumpTo(cur);
    playTimer = ui.util.setTimeout(step, TL_PLAY_MS);
  };
  playTimer = ui.util.setTimeout(step, TL_PLAY_MS);
}

var tlRow1 = ui.Panel({layout: ui.Panel.Layout.flow('horizontal'),
  style:{margin:'0px', padding:'0px'}});
tlRow1.add(tlDateLbl);
tlRow1.add(btnPrev); tlRow1.add(btnNext); tlRow1.add(btnNow); tlRow1.add(btnMore);

var tlPanel = ui.Panel({widgets:[tlRow1, tlExtra],
  style:{position:'bottom-left', padding:'4px 7px',
         margin:'0px 0px 24px 8px',
         backgroundColor:'rgba(255,255,255,0.94)',
         border:'1px solid ' + C.line}});
map.add(tlPanel);


/**** 9. BẢNG TỔNG QUAN ============================================== */
function showOverview(){
  MODE = 'overview'; SELECTED = null;
  mainPanel.clear();
  redraw();
  map.centerObject(AOI_VIEW, 13);

  var list = [];
  for (var ma in DB) list.push(DB[ma]);

  // ---------- Cảnh báo nguồn dữ liệu ----------
  if (USING_FALLBACK){
    var wc = ui.Panel({style:{backgroundColor:C.warnLt,
      border:'1px solid '+C.warn, padding:'6px 8px', margin:'0 0 8px 0'}});
    wc.add(ui.Label('Đang dùng dữ liệu dự phòng',
      {fontWeight:'bold', fontSize:T.h3, color:C.warn, margin:'0px'}));
    wc.add(ui.Label('Không đọc được asset ' + ASSET_PLOTS.split('/').pop() +
      '. App chạy bằng 10 thửa lưu trong code — chỉnh sửa sẽ không lưu chung được.',
      {fontSize:T.small, color:C.ink, margin:'2px 0 0 0'}));
    wc.add(ui.Label('Phục hồi: mục Quản trị dữ liệu → Ghi vào asset thửa.',
      {fontSize:T.small, color:C.accent, fontWeight:'bold', margin:'2px 0 0 0'}));
    mainPanel.add(wc);
  }

  // ---------- Tổng hợp số liệu ----------
  var totalHa=0, harvHa=0, slTong=0, haTong=0;
  list.forEach(function(r){
    var a = areaOf(r.props);
    totalHa += a;
    if (r.stats.stage==='Đã thu hoạch') harvHa += a;
    slTong += r.stats.slTuoi; haTong += r.stats.haTinh;
  });
  var canGat = list.filter(function(r){ return r.stats.prio<=1; }).length;

  // ---------- Dải chỉ số ----------
  var k1 = ui.Panel({layout:ui.Panel.Layout.flow('horizontal'),
    style:{margin:'0 0 4px 0', padding:'0px'}});
  k1.add(kpi(haTong.toFixed(1), 'ha', 'Diện tích canh tác', C.primary));
  k1.add(kpi(slTong.toFixed(1), 'tấn', 'Sản lượng dự kiến', C.accent));
  k1.add(kpi(String(list.length), 'thửa', 'Đang giám sát', C.ink));
  mainPanel.add(k1);

  var k2 = ui.Panel({layout:ui.Panel.Layout.flow('horizontal'),
    style:{margin:'0 0 8px 0', padding:'0px'}});
  k2.add(kpi(String(canGat), 'thửa', 'Cần gặt trong tuần', C.warn));
  k2.add(kpi(harvHa.toFixed(1), 'ha', 'Đã thu hoạch', C.muted));
  k2.add(kpi((haTong>0?(slTong/haTong).toFixed(1):'0'), 't/ha', 'Năng suất BQ', C.muted));
  mainPanel.add(k2);

  // ---------- Cơ cấu giai đoạn ----------
  var cGiaiDoan = card();
  cGiaiDoan.add(sectionHead('CƠ CẤU GIAI ĐOẠN SINH TRƯỞNG'));
  STAGE_ORDER.forEach(function(st){
    var nhom = list.filter(function(r){ return r.stats.stage===st; });
    if (nhom.length===0) return;
    var pct = nhom.length/list.length*100;
    var row = ui.Panel({layout:ui.Panel.Layout.flow('horizontal'),
      style:{margin:'0 0 3px 0', padding:'0px'}});
    row.add(ui.Label('', {backgroundColor:STAGE_COLORS[st], padding:'0 4px',
      margin:'2px 6px 2px 0', height:'11px'}));
    row.add(ui.Label(st, {fontSize:T.body, width:'104px', color:C.ink,
      margin:'0px', padding:'0px'}));
    row.add(ui.Label(nhom.length + ' thửa', {fontSize:T.small, width:'48px',
      color:C.muted, margin:'1px 0 0 0', padding:'0px'}));
    row.add(bar(pct, STAGE_COLORS[st]));
    cGiaiDoan.add(row);
  });
  mainPanel.add(cGiaiDoan);

  // ---------- Kế hoạch thu hoạch ----------
  var B = [{ten:'Quá hạn — gặt ngay', ha:0, sl:0, n:0, mau:C.danger},
           {ten:'Trong 7 ngày',       ha:0, sl:0, n:0, mau:C.warn},
           {ten:'8 – 14 ngày',        ha:0, sl:0, n:0, mau:'#F9A825'},
           {ten:'Sau 14 ngày',        ha:0, sl:0, n:0, mau:C.primary}];
  list.forEach(function(r){
    var o = r.stats.overdue, i;
    if (o > 0) i = 0; else if (o >= -7) i = 1;
    else if (o >= -14) i = 2; else i = 3;
    B[i].ha += r.stats.haTinh; B[i].sl += r.stats.slTuoi; B[i].n++;
  });
  var cKH = card();
  cKH.add(sectionHead('KẾ HOẠCH THU HOẠCH'));
  B.forEach(function(b){
    if (b.n === 0) return;
    var row = ui.Panel({layout:ui.Panel.Layout.flow('horizontal'),
      style:{margin:'0 0 3px 0', padding:'0px'}});
    row.add(ui.Label('', {backgroundColor:b.mau, padding:'0 2px',
      margin:'1px 7px 1px 0', height:'22px'}));
    var txt = ui.Panel({style:{margin:'0px', padding:'0px', width:'150px'}});
    txt.add(ui.Label(b.ten, {fontSize:T.body, color:C.ink, margin:'0px',
      padding:'0px', fontWeight:'bold'}));
    txt.add(ui.Label(b.n + ' thửa · ' + b.ha.toFixed(1) + ' ha',
      {fontSize:T.tiny, color:C.muted, margin:'0px', padding:'0px'}));
    row.add(txt);
    row.add(ui.Label(b.sl.toFixed(1) + ' tấn', {fontSize:T.h2,
      fontWeight:'bold', color:b.mau, margin:'5px 0 0 0', padding:'0px'}));
    cKH.add(row);
  });
  mainPanel.add(cKH);

  // ---------- Danh sách thửa ----------
  var cDS = card();
  cDS.add(sectionHead('DANH SÁCH THỬA'));
  cDS.add(ui.Label('Chạm mã thửa để xem chi tiết và vùng lân cận',
    {fontSize:T.tiny, color:C.faint, margin:'0 0 5px 0'}));

  list.sort(function(a,b){
    if (a.stats.prio!==b.stats.prio) return a.stats.prio-b.stats.prio;
    return b.stats.dasNow-a.stats.dasNow;
  });

  list.forEach(function(r){
    var st=r.stats, p=r.props;
    var row = ui.Panel({layout:ui.Panel.Layout.flow('horizontal'),
      style:{margin:'0 0 1px 0', padding:'0px'}});
    row.add(ui.Label('', {backgroundColor:STAGE_COLORS[st.stage],
      padding:'0 2px', margin:'2px 6px 2px 0', height:'26px'}));
    row.add(ui.Button({label:p.ma_ruong,
      style:{fontSize:T.small, padding:'0px', margin:'2px 5px 0 0', width:'54px'},
      onClick:(function(c){return function(){ showDetail(c); };})(p.ma_ruong)}));
    var mid = ui.Panel({style:{margin:'0px', padding:'0px', width:'150px'}});
    mid.add(ui.Label(p.chu_ho, {fontSize:T.body, color:C.ink,
      margin:'0px', padding:'0px'}));
    mid.add(ui.Label(st.dasNow + ' ngày · ' + st.stage +
      (st.lastV!==null ? ' · NDVI ' + st.lastV.toFixed(2) : ''),
      {fontSize:T.tiny, color:C.muted, margin:'0px', padding:'0px'}));
    row.add(mid);
    var right = ui.Panel({style:{margin:'0px', padding:'0px'}});
    right.add(ui.Label(st.slTuoi.toFixed(1) + ' tấn', {fontSize:T.body,
      fontWeight:'bold', color:C.primary, margin:'0px', padding:'0px'}));
    if (st.prio<=1){
      right.add(ui.Label(st.alert.replace('KHẨN: ',''), {fontSize:T.tiny,
        color: st.prio===0?C.danger:C.warn, margin:'0px', padding:'0px'}));
    }
    row.add(right);
    cDS.add(row);
  });
  mainPanel.add(cDS);

  // ---------- Quản trị dữ liệu (thu gọn) ----------
  var adminBody = ui.Panel({style:{margin:'6px 0 0 0', padding:'0px',
    shown:false}});
  var adminBtn = ui.Button({label:'▸  Quản trị dữ liệu',
    style:{stretch:'horizontal', fontSize:T.body},
    onClick:function(){
      adminOpen = !adminOpen;
      adminBody.style().set('shown', adminOpen);
      adminBtn.setLabel((adminOpen ? '▾' : '▸') + '  Quản trị dữ liệu');
    }});
  mainPanel.add(adminBtn);
  buildAdmin(adminBody, list);
  mainPanel.add(adminBody);
}

/**** KHỐI QUẢN TRỊ DỮ LIỆU (thu gọn mặc định) ======================= */
var adminOpen = false;

function buildAdmin(host, list){
  host.clear();

  // --- 1. Lưu chỉnh sửa ---
  var c1 = card();
  c1.add(sectionHead('1 · LƯU CHỈNH SỬA'));
  var nSua = 0; for (var k in URL_EDITS) nSua++;
  c1.add(ui.Label((ui.url && ui.url.set)
    ? 'Chỉnh sửa lưu vào đường dẫn app' +
      (nSua>0 ? ' — hiện có ' + nSua + ' thửa đã sửa.' : '.') +
      ' Sao chép thanh địa chỉ là đã lưu.'
    : 'Trình duyệt không hỗ trợ lưu vào đường dẫn.',
    {fontSize:T.small, color:C.muted, margin:'0 0 5px 0'}));
  c1.add(ui.Button({label:'Hiện bảng CSV để sao chép',
    style:{stretch:'horizontal', fontSize:T.body},
    onClick:function(){ showCsvBlock(list); }}));
  CSV_HOLDER = ui.Panel();
  c1.add(CSV_HOLDER);
  host.add(c1);

  // --- 2. Nhận cập nhật từ HTX ---
  var c2 = card();
  c2.add(sectionHead('2 · NHẬN CẬP NHẬT TỪ HTX'));
  c2.add(ui.Label('Dán mã cập nhật cán bộ HTX gửi, hoặc mở thẳng đường dẫn ' +
    'họ gửi thì mã tự nạp.', {fontSize:T.small, color:C.muted, margin:'0 0 4px 0'}));
  var maBox = ui.Textbox({placeholder:'BT8-01~OM 5451~2026-04-18;…',
    style:{width:'330px', fontSize:T.small, margin:'0 0 4px 0'}});
  c2.add(maBox);
  var maMsg = ui.Label('', {fontSize:T.small, margin:'3px 0 0 0'});
  c2.add(ui.Button({label:'Nạp mã cập nhật',
    style:{stretch:'horizontal', fontSize:T.body},
    onClick:function(){ napMaCapNhat(maBox.getValue(), maMsg); }}));
  c2.add(maMsg);
  if (FORM_URL && FORM_URL.length > 10){
    c2.add(ui.Label('Mở phiếu cập nhật (Google Form)',
      {fontSize:T.body, color:C.accent, margin:'5px 0 0 0'}, FORM_URL));
  }
  host.add(c2);

  // --- 3. Ghi vào asset ---
  var c3 = card();
  c3.add(sectionHead('3 · GHI VÀO ASSET'));
  c3.add(ui.Label('Chốt số liệu cho cả HTX cùng thấy. Chỉ chạy trong Code ' +
    'Editor — bấm hai lần để xác nhận, rồi mở tab Tasks bấm RUN.',
    {fontSize:T.small, color:C.muted, margin:'0 0 5px 0'}));
  var btnW1 = ui.Button({label:'Ghi asset thửa (kèm ranh)',
    style:{stretch:'horizontal', fontSize:T.body},
    onClick:function(){
      writeAsset(list, ASSET_PLOTS, true, btnW1, 'ranh thửa', 'GhiAsset_RanhThua');
    }});
  c3.add(btnW1);
  var btnW2 = ui.Button({label:'Ghi asset thuộc tính',
    style:{stretch:'horizontal', fontSize:T.body},
    onClick:function(){
      writeAsset(list, ASSET_META, false, btnW2, 'thuộc tính', 'GhiAsset_ThuocTinh');
    }});
  c3.add(btnW2);
  ASSET_MSG = ui.Label('', {fontSize:T.small, color:C.muted, margin:'3px 0 0 0'});
  c3.add(ASSET_MSG);
  c3.add(ui.Label('GEE không ghi đè asset đang có. Nếu báo "Cannot overwrite ' +
    'asset", xoá asset cũ trong tab Assets rồi RUN lại.',
    {fontSize:T.tiny, color:C.warn, margin:'3px 0 0 0'}));
  host.add(c3);

  // --- 4. Xuất ra Drive ---
  var c4 = card();
  c4.add(sectionHead('4 · XUẤT RA DRIVE'));
  c4.add(ui.Button({label:'Xuất bảng theo dõi (CSV)',
    style:{stretch:'horizontal', fontSize:T.body},
    onClick:function(){ exportCsv(list); }}));
  c4.add(ui.Button({label:'Xuất bảng thuộc tính (CSV)',
    style:{stretch:'horizontal', fontSize:T.body},
    onClick:function(){ exportMeta(list); }}));
  host.add(c4);
}


/**** BẢNG CSV HIỆN NGAY TRONG APP ĐỂ COPY =========================== *
 *  App đã publish không chạy được Export và không hiện Console, nên
 *  cách lấy dữ liệu ra là: in bảng CSV lên panel, người dùng bôi đen
 *  rồi Ctrl+C, dán thẳng vào Excel.
 * ================================================================== */
var CSV_HOLDER = null;
var csvShown = false;
var ASSET_MSG = ui.Label('');

function showCsvBlock(list){
  if (!CSV_HOLDER) return;
  CSV_HOLDER.clear();
  csvShown = !csvShown;
  if (!csvShown) return;

  list.sort(function(a,b){
    return a.props.ma_ruong < b.props.ma_ruong ? -1 : 1; });

  var lines = ['ma_ruong,chu_ho,giong,ngay_sa,vu,dt_csv_ha'];
  list.forEach(function(r){
    var p = r.props, ms = parseSowDate(p.ngay_sa);
    lines.push([p.ma_ruong, p.chu_ho, p.giong,
                (isNaN(ms) ? '' : fmtISO(ms)), p.vu,
                (p.dt_csv_ha === undefined ? '' : p.dt_csv_ha)].join(','));
  });

  CSV_HOLDER.add(ui.Label('Bôi đen toàn khối rồi Ctrl+C, dán vào Excel',
    {fontSize:T.small, color:C.warn, margin:'6px 0 3px 0'}));
  var box = ui.Panel({style:{backgroundColor:C.surfaceAlt,
    border:'1px solid '+C.line, padding:'6px', margin:'0 0 4px 0'}});
  lines.forEach(function(l){
    box.add(ui.Label(l, {fontSize:T.tiny, color:C.ink, margin:'0px',
      padding:'0px', whiteSpace:'pre'}));
  });
  CSV_HOLDER.add(box);
  CSV_HOLDER.add(ui.Label('Bấm lại nút trên để ẩn khối này.',
    {fontSize:T.tiny, color:C.faint, margin:'0px'}));
}

/**** GHI THẲNG VÀO ASSET (không qua Drive/CSV) ====================== *
 *  Export.table.toAsset() ghi thẳng FeatureCollection vào asset GEE.
 *  Ưu điểm so với vòng CSV: không tải xuống, không tải lên, GIỮ ĐƯỢC
 *  HÌNH HỌC (CSV xuất ra không nạp ngược hình học được).
 *
 *  ⚠ CHỈ CHẠY TRONG CODE EDITOR (cần tab Tasks để bấm RUN).
 *  ⚠ toAsset KHÔNG nhận feature có hình học rỗng (khác toDrive). Vì vậy
 *    asset thuộc tính được ghi kèm TÂM THỬA (điểm) thay vì để trống.
 *  ⚠ GEE không ghi đè asset đang tồn tại. Nếu tác vụ báo "Cannot
 *    overwrite asset" thì vào tab Assets xoá asset cũ rồi RUN lại.
 * ================================================================== */
/**** NẠP "MÃ CẬP NHẬT" DÁN TỪ GOOGLE SHEETS ======================== *
 *  Chuỗi một dòng do Apps Script sinh ra, dạng:
 *      BT8-01~OM 5451~2026-04-18;BT8-03~OM 18~2026-04-22
 *  Cùng định dạng với tham số ?sua= trên đường dẫn, nên dán mã hay mở
 *  link đều cho kết quả như nhau.
 * ================================================================== */
function napMaCapNhat(ma, lbl){
  if (!ma || String(ma).trim() === ''){
    lbl.setValue('Chưa dán mã.');
    lbl.style().set('color', '#d84315'); return;
  }
  var recs = String(ma).trim().split(';');
  var ok = 0, boQua = [], loi = [];
  for (var i=0; i<recs.length; i++){
    if (recs[i].trim() === '') continue;
    var f = recs[i].split('~');
    if (f.length < 3){ loi.push(recs[i].slice(0,14)); continue; }
    var maT = f[0].trim(), giongT = f[1].trim(), ngayT = f[2].trim();
    if (!DB[maT]){ boQua.push(maT); continue; }
    var ms = parseSowDate(ngayT);
    if (isNaN(ms)){ loi.push(maT + ' (ngày sai)'); continue; }
    if (giongT) DB[maT].props.giong = giongT;
    DB[maT].props.ngay_sa = fmtISO(ms);
    computeStats(DB[maT]);
    ok++;
  }
  if (ok > 0){
    saveEditsToUrl();
    redraw();
    showOverview();
  }
  var msg = 'Đã nạp ' + ok + ' thửa.';
  if (boQua.length) msg += ' Không có trong danh sách: ' + boQua.join(', ') + '.';
  if (loi.length)   msg += ' Lỗi: ' + loi.join(', ') + '.';
  lbl.setValue(msg);
  lbl.style().set('color', (loi.length || boQua.length) ? '#d84315' : '#2e7d32');
}

var pendingWrite = null;

function writeAsset(list, target, kemHinhHoc, btn, nhan, ten){
  if (pendingWrite !== target){
    pendingWrite = target;
    btn.setLabel('Bấm lần nữa để xác nhận ghi ' + nhan);
    return;
  }
  pendingWrite = null;

  var thieuHinh = 0;
  var feats = [];
  for (var i=0; i<list.length; i++){
    var p = list[i].props;
    var ms = parseSowDate(p.ngay_sa);
    var g  = GEOM[p.ma_ruong];
    if (!g){ thieuHinh++; continue; }        // toAsset KHÔNG nhận hình học rỗng
    var geom = ee.Geometry(g);
    // Asset thuộc tính: dùng TÂM THỬA (điểm) cho nhẹ, vẫn hợp lệ với toAsset
    if (!kemHinhHoc) geom = geom.centroid(1);
    feats.push(ee.Feature(geom, {
      ma_ruong:  p.ma_ruong,
      chu_ho:    p.chu_ho,
      giong:     p.giong,
      ngay_sa:   isNaN(ms) ? '' : fmtISO(ms),
      vu:        p.vu,
      dt_csv_ha: (p.dt_csv_ha === undefined || p.dt_csv_ha === null)
                   ? 0 : p.dt_csv_ha
    }));
  }

  if (feats.length === 0){
    btn.setLabel('Không có thửa nào có hình học — huỷ');
    return;
  }

  Export.table.toAsset({
    collection: ee.FeatureCollection(feats),
    description: ten,
    assetId: target
  });

  btn.setLabel('Đã tạo tác vụ (' + feats.length + ' thửa) — xem tab Tasks');
  ASSET_MSG.setValue('Mở tab Tasks bấm RUN. NẾU BÁO "Cannot overwrite asset": ' +
    'vào tab Assets xoá asset cũ (' + target.split('/').pop() + ') rồi RUN lại.' +
    (thieuHinh > 0 ? ' — Bỏ qua ' + thieuHinh + ' thửa thiếu hình học.' : ''));
  ASSET_MSG.style().set('color', '#1565c0');
}

function exportMeta(list){
  list.sort(function(a,b){
    return a.props.ma_ruong < b.props.ma_ruong ? -1 : 1; });
  var feats = list.map(function(r){
    var p = r.props;
    var ms = parseSowDate(p.ngay_sa);
    return ee.Feature(null, {
      ma_ruong: p.ma_ruong, chu_ho: p.chu_ho, giong: p.giong,
      ngay_sa: isNaN(ms) ? '' : fmtISO(ms),
      vu: p.vu, dt_gis_ha: p.dt_gis_ha, dt_csv_ha: p.dt_csv_ha
    });
  });
  Export.table.toDrive({
    collection: ee.FeatureCollection(feats),
    description: 'HTX_thuoctinh_CAPNHAT',
    fileFormat: 'CSV',
    selectors: ['ma_ruong','chu_ho','giong','ngay_sa','vu','dt_gis_ha','dt_csv_ha']
  });
  print('Đã tạo tác vụ Export (tab Tasks > RUN). Chỉ chạy trong Code Editor.');
}

function exportCsv(list){
  var feats = list.map(function(r){
    var s=r.stats,p=r.props;
    return ee.Feature(null,{ma_ruong:p.ma_ruong, chu_ho:p.chu_ho, giong:p.giong,
      dien_tich_ha:p.dt_csv_ha, ngay_sa:p.ngay_sa, das:s.dasNow, tgst:s.dur,
      thu_hoach_du_kien:fmtDate(s.harvMs), ndvi_dinh:s.peakV, das_dinh:s.dasPeak,
      ndvi_moi_nhat:s.lastV, ndvi_xung_quanh:s.ringV, chenh_lech_ndvi:s.ringDiff,
      vh_moi_nhat:s.vhLast, vh_sut_dB:s.vhDrop, so_anh_s2:s.nObs,
      khoang_trong_ngay:s.maxGap, giai_doan:s.stage, canh_bao:s.alert,
      dt_gis_ha:p.dt_gis_ha, dt_tinh_ha:s.haTinh,
      nang_suat_tha:s.nsGiong, he_so_sinh_truong:s.hesoV,
      sl_lua_tuoi_tan:s.slTuoi, sl_lua_kho_tan:s.slKho});
  });
  Export.table.toDrive({collection: ee.FeatureCollection(feats),
    description:'GiamSat_HeThu2026_HTX_VongDong', fileFormat:'CSV'});
  print('Đã tạo tác vụ Export — mở tab Tasks để chạy.');
}

/**** 10. THẺ CHI TIẾT + SO SÁNH VÙNG XUNG QUANH ===================== */

/**** 10c. CẬP NHẬT GIỐNG / NGÀY SẠ ================================= */
function applyEdit(ma, giong, ngaySa, msgLbl){
  var rec = DB[ma]; if(!rec){ return; }
  // Nhận nhiều định dạng (YYYY-MM-DD, DD/MM/YYYY, epoch ms) rồi CHUẨN HÓA
  var ms = parseSowDate(ngaySa);
  if (isNaN(ms)){
    msgLbl.setValue('Không đọc được ngày. Nhập dạng YYYY-MM-DD, ví dụ 2026-04-18.');
    msgLbl.style().set('color', '#d84315'); return;
  }
  var das = Math.round((Date.now() - ms)/86400000);
  if (das < 0){
    msgLbl.setValue('Ngày sạ nằm ở tương lai — kiểm tra lại.');
    msgLbl.style().set('color', '#d84315'); return;
  }
  if (das > 200){
    msgLbl.setValue('✖ Ngày sạ cách hôm nay ' + das + ' ngày — kiểm tra lại.');
    msgLbl.style().set('color', '#d84315'); return;
  }
  rec.props.giong   = giong;
  rec.props.ngay_sa = fmtISO(ms);     // luôn lưu dạng chuẩn YYYY-MM-DD
  computeStats(rec);
  saveEditsToUrl();                   // GHI NHẬN vào đường dẫn
  showDetail(ma);
  redraw();
  msgLbl.setValue('Đã cập nhật · ngày sau sạ ' + das + ' · ' + rec.stats.stage +
    ' · chỉnh sửa đã lưu vào đường dẫn (copy thanh địa chỉ để giữ).');
  msgLbl.style().set('color', '#2e7d32');
}

function showDetail(ma){
  var r = DB[ma]; if(!r) return;
  var s = r.stats, p = r.props;
  MODE = 'detail'; SELECTED = ma;
  mainPanel.clear();
  redraw();
  map.centerObject(ee.Geometry(GEOM[ma]).buffer(BUFFER_M), 15);

  mainPanel.add(ui.Button({label:'←  Về bảng tổng quan',
    style:{stretch:'horizontal', fontSize:T.body},
    onClick:function(){ showOverview(); }}));

  // ---------- Đầu thẻ ----------
  var head = ui.Panel({style:{backgroundColor:C.primaryLt,
    border:'1px solid '+C.line, padding:'8px 10px', margin:'8px 0 8px 0'}});
  head.add(ui.Label(p.ma_ruong + ' · ' + p.chu_ho,
    {fontWeight:'bold', fontSize:'15px', color:C.primary, margin:'0px'}));
  var badge = ui.Panel({layout:ui.Panel.Layout.flow('horizontal'),
    style:{margin:'3px 0 0 0', padding:'0px'}});
  badge.add(ui.Label(s.stage, {fontSize:T.small, color:'#FFFFFF',
    backgroundColor:STAGE_COLORS[s.stage], padding:'2px 7px', margin:'0 5px 0 0'}));
  badge.add(ui.Label(p.giong, {fontSize:T.small, color:C.accent,
    backgroundColor:C.accentLt, padding:'2px 7px', margin:'0px'}));
  head.add(badge);
  head.add(ui.Label(s.note, {fontSize:T.small, color:C.muted, margin:'4px 0 0 0'}));
  if (s.prio<=1){
    head.add(ui.Label(s.alert, {fontSize:T.body, color:C.danger,
      fontWeight:'bold', margin:'3px 0 0 0'}));
  }
  mainPanel.add(head);

  // ---------- Chỉ số nổi bật ----------
  var kp = ui.Panel({layout:ui.Panel.Layout.flow('horizontal'),
    style:{margin:'0 0 8px 0', padding:'0px'}});
  kp.add(kpi(String(s.dasNow), 'ngày', 'Sau sạ', C.ink));
  kp.add(kpi(s.slTuoi.toFixed(1), 'tấn', 'Sản lượng dự kiến', C.primary));
  kp.add(kpi(s.lastV!==null ? s.lastV.toFixed(2) : '–', '', 'NDVI mới nhất', C.accent));
  mainPanel.add(kp);

  // ---------- Lịch thời vụ ----------
  var c1 = card();
  c1.add(sectionHead('LỊCH THỜI VỤ'));
  c1.add(kv('Ngày sạ', fmtDate(s.saMs)));
  c1.add(kv('Thời gian sinh trưởng', s.dur + ' ngày (giống ' + p.giong + ')'));
  c1.add(kv('Thu hoạch dự kiến', fmtDate(s.harvMs), C.ink, true));
  c1.add(kv('Còn lại', s.overdue<=0 ? (-s.overdue) + ' ngày'
                                    : 'đã quá ' + s.overdue + ' ngày',
    s.overdue>=-7 ? C.danger : C.ink, true));
  mainPanel.add(c1);

  // ---------- Sản lượng ----------
  var c2 = card();
  c2.add(sectionHead('SẢN LƯỢNG DỰ KIẾN'));
  c2.add(kv('Diện tích tính', s.haTinh.toFixed(2) + ' ha'));
  c2.add(kv('Năng suất giống', s.nsGiong.toFixed(1) + ' tấn/ha'));
  c2.add(kv('Hệ số sinh trưởng', s.hesoV.toFixed(2)));
  c2.add(divider());
  c2.add(kv('Lúa tươi', s.slTuoi.toFixed(2) + ' tấn', C.primary, true));
  c2.add(kv('Quy lúa khô', s.slKho.toFixed(2) + ' tấn'));
  mainPanel.add(c2);

  // ---------- Chỉ số vệ tinh ----------
  var c3 = card();
  c3.add(sectionHead('CHỈ SỐ VỆ TINH'));
  if (s.nObs>0){
    c3.add(kv('NDVI đỉnh', s.peakV.toFixed(3) + '  ·  ngày ' + s.dasPeak));
    c3.add(kv('NDVI mới nhất', s.lastV.toFixed(3) + '  ·  ngày ' + s.dasLast, C.ink, true));
    c3.add(kv('Ảnh gần nhất', fmtDate(s.lastMs) + '  (' + s.ageObs + ' ngày trước)',
      s.ageObs>15 ? C.warn : C.ink));
  }
  if (s.vhLast!==null){
    c3.add(kv('Radar VH', s.vhLast.toFixed(1) + ' dB'));
    c3.add(kv('VH sụt so đỉnh', s.vhDrop.toFixed(1) + ' dB' +
      (s.vhDrop>VH_HARV_DROP ? '  · dấu hiệu đã gặt' : ''),
      s.vhDrop>VH_HARV_DROP ? C.warn : C.ink));
  }
  if (s.ringV !== null){
    c3.add(divider());
    c3.add(kv('NDVI ruộng lân cận', s.ringV.toFixed(3)));
    var dcol = Math.abs(s.ringDiff)>0.10 ? C.warn : C.primary;
    c3.add(kv('Chênh lệch', (s.ringDiff>0?'+':'') + s.ringDiff.toFixed(3), dcol, true));
    c3.add(ui.Label(s.ringMsg, {fontSize:T.small, color:dcol, margin:'2px 0 0 0'}));
  }
  c3.add(divider());
  c3.add(ui.Label(s.nObs + ' ảnh quang học · ' + s.nVh + ' ảnh radar · ' +
    'trống lớn nhất ' + s.maxGap + ' ngày',
    {fontSize:T.tiny, color:C.faint, margin:'0px'}));
  mainPanel.add(c3);

  // ---------- Biểu đồ ----------
  var rmap = {};
  for (var q=0;q<r.ring.length;q++) rmap[r.ring[q][0]] = r.ring[q][1];
  var dt = [[{label:'Ngày sau sạ',type:'number'},{label:'Thửa này',type:'number'},
             {label:'Ruộng lân cận',type:'number'},
             {label:'Ngưỡng gặt',type:'number'}]];
  var nPts = 0;
  for (var i=0;i<r.nd.length;i++){
    var t = r.nd[i][0];
    var das_i = daysBetween(s.saMs, t);
    if (!isFinite(das_i)) continue;
    var rv = null, bd = 1e9;
    for (var kk in rmap){
      var dd = Math.abs(Number(kk)-t);
      if (dd<bd){ bd=dd; rv=rmap[kk]; }
    }
    dt.push([das_i, r.nd[i][1], (bd<=3*86400000?rv:null), NDVI_HARV]);
    nPts++;
  }
  if (nPts===0){
    mainPanel.add(ui.Label('Không vẽ được biểu đồ: ngày sạ không đọc được.',
      {fontSize:T.body, color:C.danger, margin:'4px 0 0 0'}));
  }
  if (nPts>1){
    var c4 = card();
    c4.add(sectionHead('DIỄN BIẾN NDVI'));
    c4.add(ui.Chart(dt,'LineChart',{
      height:200, chartArea:{width:'78%', height:'70%'},
      hAxis:{title:'Ngày sau sạ', titleTextStyle:{fontSize:10, italic:false},
             textStyle:{fontSize:9}, baseline:s.dur, baselineColor:C.danger,
             gridlines:{color:'#F0F3F7'}},
      vAxis:{title:'NDVI', titleTextStyle:{fontSize:10, italic:false},
             textStyle:{fontSize:9}, viewWindow:{min:0,max:1},
             gridlines:{color:'#F0F3F7'}},
      series:{0:{color:C.primary, lineWidth:2, pointSize:5},
              1:{color:'#8E24AA', lineWidth:2, pointSize:3, lineDashStyle:[5,3]},
              2:{color:'#A65628', lineWidth:1, lineDashStyle:[3,3], pointSize:0}},
      legend:{position:'top', textStyle:{fontSize:9}},
      backgroundColor:'transparent', interpolateNulls:true
    }));
    c4.add(ui.Label('Vạch dọc đỏ = mốc thu hoạch theo giống. Điểm thưa là do ' +
      'mây che, không phải lúa mất sinh khối.',
      {fontSize:T.tiny, color:C.faint, margin:'0px'}));
    mainPanel.add(c4);
  }

  var dv=[[{label:'Ngày sau sạ',type:'number'},{label:'VH (dB)',type:'number'}]];
  var nVhPts = 0;
  for (var j=0;j<r.vh.length;j++){
    var das_j = daysBetween(s.saMs, r.vh[j][0]);
    if (!isFinite(das_j)) continue;
    dv.push([das_j, r.vh[j][1]]); nVhPts++;
  }
  if (nVhPts>1){
    var c5 = card();
    c5.add(sectionHead('RADAR SENTINEL-1 (XUYÊN MÂY)'));
    c5.add(ui.Chart(dv,'LineChart',{
      height:160, chartArea:{width:'78%', height:'68%'},
      hAxis:{title:'Ngày sau sạ', titleTextStyle:{fontSize:10, italic:false},
             textStyle:{fontSize:9}, gridlines:{color:'#F0F3F7'}},
      vAxis:{title:'VH (dB)', titleTextStyle:{fontSize:10, italic:false},
             textStyle:{fontSize:9}, gridlines:{color:'#F0F3F7'}},
      series:{0:{color:C.accent, lineWidth:2, pointSize:4}},
      legend:{position:'none'}, backgroundColor:'transparent'}));
    mainPanel.add(c5);
  }

  // ---------- Cập nhật hồ sơ ----------
  var c6 = card();
  c6.add(sectionHead('CẬP NHẬT HỒ SƠ THỬA'));
  var gItems = [];
  for (var gv in VARIETY_DAYS) gItems.push(gv);
  if (gItems.indexOf(p.giong) < 0) gItems.push(p.giong);
  var gRow = ui.Panel({layout:ui.Panel.Layout.flow('horizontal'),
    style:{margin:'0px', padding:'0px'}});
  gRow.add(ui.Label('Giống', {fontSize:T.body, width:'64px', color:C.muted,
    margin:'5px 0 0 0'}));
  var gSel = ui.Select({items:gItems, value:p.giong,
    style:{width:'170px', fontSize:T.small, margin:'2px 0'}});
  gRow.add(gSel); c6.add(gRow);

  var dRow = ui.Panel({layout:ui.Panel.Layout.flow('horizontal'),
    style:{margin:'0px', padding:'0px'}});
  dRow.add(ui.Label('Ngày sạ', {fontSize:T.body, width:'64px', color:C.muted,
    margin:'5px 0 0 0'}));
  var saIso = isNaN(s.saMs) ? '' : fmtISO(s.saMs);
  var dBox = ui.Textbox({value:saIso, placeholder:'YYYY-MM-DD',
    style:{width:'170px', fontSize:T.small, margin:'2px 0'}});
  dRow.add(dBox); c6.add(dRow);

  var editMsg = ui.Label('', {fontSize:T.small, margin:'3px 0 0 0'});
  c6.add(ui.Button({label:'Áp dụng và tính lại',
    style:{stretch:'horizontal', fontSize:T.body},
    onClick:function(){ applyEdit(ma, gSel.getValue(), dBox.getValue(), editMsg); }}));
  c6.add(editMsg);
  c6.add(ui.Label('Chỉnh sửa lưu vào đường dẫn app. Muốn lưu chung cho cả HTX, ' +
    'dùng mục Quản trị dữ liệu ở bảng tổng quan.',
    {fontSize:T.tiny, color:C.faint, margin:'3px 0 0 0'}));
  mainPanel.add(c6);
}

/**** 11. NẠP DỮ LIỆU & KHỞI CHẠY ==================================== */
map.onClick(function(coords){
  var pt = ee.Geometry.Point([coords.lon, coords.lat]);
  htPlots.filterBounds(pt).first().evaluate(function(f){
    if (f && DB[f.properties.ma_ruong]) showDetail(f.properties.ma_ruong);
  });
});

ui.root.add(panel);
ui.root.add(map);

/**** BÁO LỖI NẠP DỮ LIỆU (thay vì để app sập trắng) ================= */
function fatalError(tieuDe, chiTiet){
  statusLbl.setValue('Không nạp được dữ liệu');
  statusLbl.style().set('color', '#d84315');
  mainPanel.clear();
  mainPanel.add(ui.Label(tieuDe,
    {fontWeight:'bold', fontSize:'13px', color:C.danger, margin:'6px 0 4px 0'}));
  if (chiTiet){
    mainPanel.add(ui.Label(String(chiTiet).slice(0,300),
      {fontSize:'10px', color:'#666', backgroundColor:'#fff3e0',
       padding:'4px', margin:'0 0 6px 0'}));
  }
  mainPanel.add(ui.Label('KIỂM TRA THEO THỨ TỰ',
    {fontWeight:'bold', fontSize:T.h3, color:C.muted, margin:'6px 0 3px 0'}));
  var ds = [
    '1. Asset ranh thửa đã tồn tại chưa? Mở tab Assets tìm:',
    '     ' + ASSET_PLOTS,
    '2. Nếu CHƯA tải asset nào: đặt USE_ASSET = false ở đầu file',
    '     để chạy tạm bằng 10 thửa nhúng sẵn trong code.',
    '3. Nếu USE_META_ASSET = true: asset thuộc tính phải tồn tại:',
    '     ' + ASSET_META,
    '     Chưa tải thì đặt USE_META_ASSET = false.',
    '4. Đường dẫn asset gõ đúng từng ký tự (phân biệt hoa/thường).',
    '5. Cột "vu" trong asset phải có giá trị đúng bằng: ' + VU_LOC,
    '6. Nếu asset của người khác: cần được chia sẻ quyền đọc.'
  ];
  ds.forEach(function(d){
    mainPanel.add(ui.Label(d, {fontSize:'10px', color:'#444', margin:'1px 0 1px 4px'}));
  });
  print('✖ ' + tieuDe);
  if (chiTiet) print(chiTiet);
}

/**** TIỀN KIỂM RỒI MỚI VẼ =========================================== */
function batDau(){
  htPlots.size().evaluate(function(n, err){
    if (err || !n || n === 0){
      // Asset hỏng/thiếu HOẶC lọc vụ không khớp -> thử dữ liệu nhúng
      if (USE_ASSET && !USING_FALLBACK){
        USING_FALLBACK = true;
        buildData(false);
        statusLbl.setValue('Asset lỗi — đang chạy bằng dữ liệu dự phòng');
        statusLbl.style().set('color', '#d84315');
        batDau();
        return;
      }
      fatalError(err ? 'Không đọc được dữ liệu thửa'
                     : 'Không có thửa nào thuộc vụ "' + VU_LOC + '"', err);
      return;
    }
    if (USING_FALLBACK){
      canhBaoDuPhong();
    } else {
      statusLbl.setValue('Đã nhận ' + n + ' thửa · đang tính chỉ số…');
    }
    tlLabel();
    redraw();
    loadPlotData();
  });
}

// Băng cảnh báo khi app đang chạy bằng dữ liệu nhúng thay vì asset
function canhBaoDuPhong(){
  statusLbl.setValue('Đang chạy bằng dữ liệu dự phòng trong mã nguồn');
  statusLbl.style().set('color', '#d84315');
}

batDau();

function loadPlotData(){
  htPlots.evaluate(function(fc, err2){
    if (err2 || !fc || !fc.features){
      fatalError('Không nạp được chi tiết thửa', err2);
      return;
    }
    fc.features.forEach(function(ft){
      var ma = ft.properties.ma_ruong;
      var pr = ft.properties;
      var ov = META_OVERRIDE[ma];
      if (ov){
        if (ov.giong)   pr.giong   = ov.giong;
        if (ov.ngay_sa) pr.ngay_sa = ov.ngay_sa;
      }
      var uv = URL_EDITS[ma];          // chỉnh sửa đi kèm đường dẫn — ưu tiên cao nhất
      if (uv){
        if (uv.giong)   pr.giong   = uv.giong;
        if (uv.ngay_sa) pr.ngay_sa = uv.ngay_sa;
      }
      DB[ma]  = {props: pr, nd:[], vh:[], ring:[]};
      GEOM[ma]= ft.geometry;
    });
    s2samples.reduceColumns(ee.Reducer.toList(3),['ma_ruong','t','mean']).get('list')
     .evaluate(function(r1){
      (r1||[]).forEach(function(x){ if(DB[x[0]]) DB[x[0]].nd.push([x[1],x[2]]); });
      s1samples.reduceColumns(ee.Reducer.toList(3),['ma_ruong','t','mean']).get('list')
       .evaluate(function(r2){
        (r2||[]).forEach(function(x){ if(DB[x[0]]) DB[x[0]].vh.push([x[1],x[2]]); });
        ringSamples.reduceColumns(ee.Reducer.toList(3),['ma_ruong','t','mean']).get('list')
         .evaluate(function(r3){
          (r3||[]).forEach(function(x){ if(DB[x[0]]) DB[x[0]].ring.push([x[1],x[2]]); });
          for (var ma in DB) computeStats(DB[ma]);
          statusLbl.setValue('Cập nhật đến ' + fmtDate(NOW) +
            ' · Sentinel-2 và Sentinel-1');
          statusLbl.style().set('color', C.faint);
          showOverview();
        });
      });
    });
  });
}

print('⚠ Vụ đang diễn ra — "Chín/Đã thu hoạch" là ước lượng vệ tinh, cần đối chiếu thực địa.');
