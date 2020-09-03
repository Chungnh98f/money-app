/*
BUILD APP: Tính toán ngân sách chi tiêu.

1. Get value người dùng nhập vào và kiểm tra xem đó là một khoản 
   thu nhập (income) or chi tiêu (expense) => lưu vào data. 
   Nếu type là + thì tương ứng với inc, ngược lại là exp.
2. Hiển thị item vừa được thêm vào => ra UI.
3. Tính tổng thu nhập (inc) và tổng chi tiêu (exp) => lưu vào data
4. Hiển thị tổng thu nhập (inc) và tổng chi tiêu (exp) ra UI.
5. Tính budget (budget = inc - exp) => lưu vào data
6. Hiển thị budget ra UI.
7. Tính percentage(%) của chi tiêu so với thu nhập: percentate = (exp / inc) * 100 => lưu vào data;
8. Hiển thị percentage ra UI.

yêu cầu:

1. Tạo 3 modules:
    - budgetController: dùng thao tác với data
    - UIController: dùng thao tác với DOM
    - Controller: dùng tương tác giữa budgetController và UIController

2. Sử dụng object để lưu data, gợi ý: 
data = {
  allItems: {
    inc: [],
    exp: []
  },
  totals: {
    inc: 0,
    exp: 0,
  },
  budget: 0,
  percentage: 0
}
*/
import "./controllers/budgetController.js";
import "./view/screens/main.js";
import "./view/components/expense-item.js";
import "./view/components/income-item.js";

const screenMap = {
  main: "<main-screen></main-screen>",
};

const storageKey = "moneyApp";
const storage = localStorage.getItem(storageKey);

const data = storage
  ? JSON.parse(storage)
  : {
      allItems: {
        inc: [],
        exp: [],
      },
      totals: {
        inc: 0,
        exp: 0,
      },
      budget: 0,
      percentage: 0,
    };

setScreen("main");

function setScreen(screenName) {
  document.getElementById("app").innerHTML = screenMap[screenName];
}

export { setScreen, data, storageKey };
