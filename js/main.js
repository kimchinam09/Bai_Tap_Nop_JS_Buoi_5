

/**
 * Bài 1: Quản lý tuyển sinh
 * Bước 1: Lấy input người dùng nhập vào
 *  Bước 2: Kiểm tra điểm nhập vào: điểm 3 môn trong khoảng 0-10, điểm chuẩn trong khoảng 0-10, nếu sai thì thông báo cho người dùng
 *  Bước 3: Tính điểm tổng kết
 *    Điểm tổng kết = tổng 3 môn + tổng điểm ưu tiên
 *    Kết quả: điểm tổng kết >= điểm chuẩn && không có điểm môn nào =0 => đỗ
 *  Bước 4:Xác định kết quả và hiển thị cho người dùng: điểm tổng kết >= điểm chuẩn && không có điểm môn nào =0 => đỗ
 *   
 */
//#region Bài 1
function scoring() {

  // Lấy input
  const STD_SCORE = Number(document.getElementById("stdScore").value)
  const GROUP_PRIORITY = document.getElementById("groupPriority").value
  const REGION_PRIORITY = document.getElementById("regionPriority").value
  const SUBJECT_1 = Number(document.getElementById("subject_1").value)
  const SUBJECT_2 = Number(document.getElementById("subject_2").value)
  const SUBJECT_3 = Number(document.getElementById("subject_3").value)

  // Kiểm tra dữ liệu input
  let isValid = SUBJECT_1 >= 0 && SUBJECT_1 <= 10 && SUBJECT_2 >= 0 && SUBJECT_2 <= 10 && SUBJECT_3 >= 0 && SUBJECT_3 <= 10 && STD_SCORE >= 0 && STD_SCORE <= 30
  console.log(isValid)

  if (!isValid) {
    showResult("", "Nhập sai điểm")
    return
  }

  // Tính điểm tổng kết
  // tổng điểm 3 môn
  let total = SUBJECT_1 + SUBJECT_2 + SUBJECT_3 + getGroupPriority(GROUP_PRIORITY) + getRegionPriority(REGION_PRIORITY)

  //kết quả: đỗ/trượt
  let result = getResult(total, SUBJECT_1, SUBJECT_2, SUBJECT_3, STD_SCORE)
  // hiển thị kết quả
  showResult(total, result)
}

// hàm con xác điểm ưu tiên theo đối tượng
function getGroupPriority(GROUP_PRIORITY) {
  switch (GROUP_PRIORITY) {
    case "1": return 2.5
    case "2": return 1.5
    case "3": return 1
    default: return 0
  }
}

// hàm con xác định điểm ưu tiên vùng
function getRegionPriority(REGION_PRIORITY) {
  switch (REGION_PRIORITY) {
    case "A": return 2
    case "B": return 1
    case "C": return 0.5
    default: return 0
  }
}

// hàm con lấy kết quả thi
function getResult(total, SUBJECT_1, SUBJECT_2, SUBJECT_3, STD_SCORE) {
  if (total < STD_SCORE || SUBJECT_1 === 0 || SUBJECT_2 === 0 || SUBJECT_3 === 0) {
    // tổng điểm nhỏ hơn điểm chuẩn hoặc có một môn = 0 => trượt
    return "TRƯỢT"
  }
  else
    return "ĐỖ"
}

// hàm con hiển thị kết quả
function showResult(total, result) {
  document.getElementById("exercise1-result").innerHTML = `
    ${total !== ""
      ? `<strong>Điểm tổng kết:</strong> ${total}<br>`
      : ""
    }
    <strong>Kết quả:</strong>
    <strong>${result}</strong>
  `;
}
//#endregion

/**
 * Bài 2: Tính tiền điện
 * 
 * Bước 1 : Tạo bảng giá điện
 * Bước 2: Lấy giá trị người dùng nhập vào
 * Bước 3: Kiểm tra dữ liệu nhập vào
 * Bước 4: Tính chi phí sử dụng điện
 * Bước 5: Hiển thị kết quả
 */
//#region Bài 2
function calculateELECost() {
  const TIER_1 = 500
  // Tạo bảng giá điện
  const TIER_2 = 650
  const TIER_3 = 850
  const TIER_4 = 1100
  const TIER_5 = 1300

  // Lấy input : số Kw tiêu thụ + tên khách hàng
  let customerName = document.getElementById("customerName").value
  let electricConsumption = Number(document.getElementById("electricConsumtion").value)

  // Kiểm tra dữ liệu người dùng nhập vào
  if (customerName === "") {
    alert("Chưa nhập tên khách hàng")
  }
  else if (electricConsumption <= 0) {
    alert("Nhập sai số kW ! Hãy nhập lại")
  }
  else {
    // Tính chi phí sử dụng điện
    let electricCost = getCost(electricConsumption, TIER_1, TIER_2, TIER_3, TIER_4, TIER_5)

    // Hiển thị kết quả
    document.getElementById("exercise2-result").innerHTML = `<strong>Khách hàng:</strong> ${customerName}<br>        
     <strong>Tiền điện:</strong>
     <strong>${electricCost} VNĐ</strong>`
  }
}

// hàm con tính chi phí sử dụng điện
function getCost(electricConsumption, TIER_1, TIER_2, TIER_3, TIER_4, TIER_5) {
  let electricCost = 0
  if (0 < electricConsumption <= 50) {
    electricCost = electricConsumption * TIER_1

  }
  else if (50 < electricConsumption <= 100) {
    electricCost = 50 * TIER_1 + (electricConsumption - 50) * TIER_2
  }
  else if (100 < electricConsumption <= 200) {
    electricCost = 50 * TIER_1 + 50 * TIER_2 + (electricConsumption - 100) * TIER_3
  }
  else if (200 < electricConsumption <= 350) {
    electricCost = 50 * TIER_1 + 50 * TIER_2 + 100 * TIER_3 + (electricConsumption - 200) * TIER_4
  }
  else if (electricConsumption > 350) {
    electricCost = 50 * TIER_1 + 50 * TIER_2 + 100 * TIER_3 + 150 * TIER_4 + (electricConsumption - 350) * TIER_5
  }
  return electricCost

}
//#endregion

/**Bài 3:Tính thuế thu nhập cá nhân
 * B1: Tạo bảng mức chịu thuế
 * B2: Lấy dữ liệu người dùng nhập vào ( tên, tổng thu nhập năm, số người phụ thuộc)
 * B3: Kiểm tra dữ liệu nhập vào
 * B4: Tính mức thu nhập chịu thuế : Thu nhập chịu thuế = Tổng thu nhập năm - 4tr- Số người phụ thuộc * 1.6tr
 * B5: Tính tiền thuế phải nộp = bằng mức thu nhập chịu thuế * thuế suất
 * B5: Hiển thị kết quả
 */

  // Mức chịu thuế
  const TAX_TIER_1 = [60000000, 0.05]
  const TAX_TIER_2 = [120000000, 0.1]
  const TAX_TIER_3 = [210000000, 0.15]
  const TAX_TIER_4 = [384000000, 0.2]
  const TAX_TIER_5 = [624000000, 0.25]
  const TAX_TIER_6 = [960000000, 0.3]
  const TAX_TIER_7 = 0.35

function calculateTax() {

  // Lấy dữ liệu nhập vào
  let taxpayer = document.getElementById("taxpayer").value
  let totalIncome = Number(document.getElementById("totalIncome").value)
  let dependents = Number(document.getElementById("dependents").value)

  // kiểm tra dữ liệu nhập vào
  if (taxpayer === "") {
    alert(" Chưa nhập tên")
    return
  }
  if (totalIncome < 0) {
    alert("Nhập sai thu nhập")
    return
  }
  if (dependents < 0) {
    alert("Nhập sai số người phụ thuộc")
  }

  // Tính mức thu nhập chịu thuế
  let taxableIncome = totalIncome - 4000000 - dependents * 1600000

  // tính tiền thuế phải nộp
  let tax = taxableIncome * getTaxRate(taxableIncome, TAX_TIER_1, TAX_TIER_2, TAX_TIER_3, TAX_TIER_4, TAX_TIER_5, TAX_TIER_6, TAX_TIER_7)
  console.log("🚀 ~ :192 ~ calculateTax ~ getTaxRate:", getTaxRate)

  // hiển thị kết quả
    document.getElementById("exercise3-result").innerHTML = `<p><strong>Họ tên:</strong> ${taxpayer}</p>        
        <p><strong>Thu nhập chịu thuế:</strong> ${formatMoney(Math.max(taxableIncome, 0))} VNĐ</p>
        <p><strong>Thuế phải nộp:</strong>
            <span class="text-danger fw-bold">${formatMoney(tax)} VNĐ</span>
        </p>`
    
}

// hàm con tính thuế suất
function getTaxRate(taxableIncome, TAX_TIER_1, TAX_TIER_2, TAX_TIER_3, TAX_TIER_4, TAX_TIER_5, TAX_TIER_6, TAX_TIER_7) {
   if (taxableIncome <= 0) return 0;

    if (taxableIncome <= TAX_TIER_1[0])
        return  TAX_TIER_1[1]

    if (taxableIncome <= TAX_TIER_2[0])
        return TAX_TIER_2[1]

    if (taxableIncome <= TAX_TIER_3[0])
        return TAX_TIER_3[1]

    if (taxableIncome <= TAX_TIER_4[0])
        return  TAX_TIER_4[1]

    if (taxableIncome <= TAX_TIER_5[0])
        return  TAX_TIER_5[1]

    if (taxableIncome <= TAX_TIER_6[0])
        return  TAX_TIER_6[1]

    return  TAX_TIER_7
}
// format hiển thị tiền vnd
function formatMoney(number) {
    return number.toLocaleString("vi-VN");
}
//#endregion

/**
 * Bài 4: Tính tiền cáp
 * B1: lập bảng phí
 * B2: lấy dữ liệu đầu vào
 * B3: kiểm tra dữ liệu đầu vào
 * B4: tính hóa đơn:
 * nhà dân: tổng tiền = phí hóa đơn + phí dịch vụ + phí kênh cao cấp* số kênh cao cấp
 * doanh nghiệp: tổng tiền = phí hóa đơn + phí dịch vụ + số kết nối phát sinh * chi phí kết nối phát sinh + phí kênh cao cấp * số kênh cao cấp
 * hiển thị dữ liệu cho người dùng
 */
  // Bảng phí: 
const INDIVIDUAL_BILL_FEE = 4.5;
const INDIVIDUAL_BASIC_SERVICE_FEE = 20.5;
const INDIVIDUAL_PREMIUM_CHANNEL_FEE = 7.5;

const BUSINESS_BILL_FEE = 15;
const BUSINESS_BASIC_SERVICE_FEE = 75;
const BUSINESS_EXTRA_CONNECTION_FEE = 5;
const BUSINESS_PREMIUM_CHANNEL_FEE = 50;

// ẩn hiện ô số kết nối
document.getElementById("customerType").addEventListener("change", toggleConnectionInput)
function toggleConnectionInput() {
  const isBusiness =
    document.getElementById("customerType").value === "businesses"

  // Doanh nghiệp: hidden = false → hiện
  // Nhà dân: hidden = true → ẩn
  document.getElementById("connectionGroup").hidden = !isBusiness
}

function calculateCableBill(){

  // Lấy dử liệu đầu vào
 let customerType = document.getElementById("customerType").value;
  let customerCode = document.getElementById("customerCode").value
  let connections = Number(document.getElementById("connections").value)
  let premiumChannels = Number(document.getElementById("premiumChannel").value)

 // kiểm tra dữ liệu vào
 if (customerCode === "") {
    alert("Chưa nhập mã khách hàng.");
    return;
  }

  if (premiumChannels < 0) {
    alert("Nhập sai số kênh cao cấp.");
    return;
  }

  if (connections < 0){
    alert("Nhập sai số kết nối.");
    return;
  }

  // tính tiền cab
  const totalBill = customerType === "individual"
      ? calculateIndividualBill(premiumChannels)
      : calculateBusinessBill(connections, premiumChannels);

      // trả kết quả cho người dùng
      document.getElementById("exercise4-result").innerHTML = `
    <div><strong>Mã khách hàng:</strong> ${customerCode}</div>
    <div><strong>Loại khách hàng:</strong> ${customerType}</div>
    ${
      customerType === "businesses"
        ? `<div><strong>Số kết nối:</strong> ${connections}</div>`
        : ""
    }
    <div><strong>Số kênh cao cấp:</strong> ${premiumChannels}</div>
    <div>
      <strong>Tổng tiền cáp:</strong>
      <span class="text-danger fw-bold">
        ${formatCurrency(totalBill)}
      </span>
    </div>
  `
}

// hàm con tính tiền nhà dân
function calculateIndividualBill(premiumChannels) {
  return (
    INDIVIDUAL_BILL_FEE +
    INDIVIDUAL_BASIC_SERVICE_FEE +
    premiumChannels * INDIVIDUAL_PREMIUM_CHANNEL_FEE
  );
}

// hàm con tính tiền doanh nghiệp
function calculateBusinessBill(connections, premiumChannels) {
  let serviceFee = BUSINESS_BASIC_SERVICE_FEE;

  if (connections > 10) {
    let extraConnections =
      connections - 10;

    serviceFee +=
      extraConnections * BUSINESS_EXTRA_CONNECTION_FEE;
  }

  return (
    BUSINESS_BILL_FEE +
    serviceFee +
    premiumChannels * BUSINESS_PREMIUM_CHANNEL_FEE
  );
}

// format tiền tệ $
function formatCurrency(amount) {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  });
}