function Validator(options) {
   let selectorRules = [];
   function validate(inputElement, rule) {
      let inValid = false;
      let messageError = rule.test(inputElement.value);
      let rules = selectorRules[rule.selector];
      // lặp qua các rule để kiểm tra lỗi
      for (let i = 0; i < rules.length; i++) {
         messageError = rules[i](inputElement.value);
         if (messageError) break;
      }
      let errorElement = inputElement.parentElement.querySelector(
         options.errorSelector
      );
      if (messageError) {
         errorElement.textContent = messageError;
         inputElement.parentElement.classList.add("invalid");
         inValid = true;
      } else {
         errorElement.textContent = "";
         inputElement.parentElement.classList.remove("invalid");
         inValid = false;
      }
      return inValid;
   }
   let formElement = document.querySelector(options.form);
   if (formElement) {
      // khi sắp submit form validate
      formElement.onsubmit = function (e) {
         e.preventDefault();
         let isFormValid = true;
         let dataCarts =
            localStorageManagement.getDataLocal("DANHSACHITEMCART");
         let dataProducts = localStorageManagement.getDataLocal("DANHSACHSP");
         if (
            !Array.isArray(dataCarts) ||
            dataCarts === null ||
            dataCarts.length <= 0
         ) {
            isFormValid = false;
            toast("Warning", "Chưa có sản phẩm nào trong giỏ hàng", "warn");
         }
         options.rules.forEach((rule) => {
            let input = formElement.querySelector(rule.selector);
            let inValid = validate(input, rule);
            if (inValid) {
               isFormValid = false;
            }
         });
         const inputElements = formElement.querySelectorAll("[name]");
         // Chuyển thành array
         const wrapper = Array.from(inputElements);
         if (isFormValid) {
            let formValues = wrapper.reduce((values, input) => {
               return (values[input.name] = input.value) && values;
            }, {});
            formValues.date = new Date().toLocaleString();
            formValues.id = apiManagement.createRandomId();
            formValues.infoOrder = dataCarts;
            let parentForm = formElement.parentElement;
            localStorageManagement.addOrderAndUpdate(
               parentForm,
               dataCarts,
               dataProducts,
               formValues
            );
            setTimeout(function () {
               location.reload();
            }, 2000);
         }
      };
      options.rules.forEach((rule) => {
         // Lưu lại tất cả các rule
         if (Array.isArray(selectorRules[rule.selector])) {
            selectorRules[rule.selector].push(rule.test);
         } else {
            selectorRules[rule.selector] = [rule.test];
         }
         let inputElement = formElement.querySelector(rule.selector);
         if (inputElement) {
            // xử lý sự kiẹn blur
            inputElement.onblur = function (e) {
               validate(inputElement, rule);
            };
            // sự kiện input
            inputElement.oninput = function (e) {
               let errorElement = inputElement.parentElement.querySelector(
                  options.errorSelector
               );
               errorElement.textContent = "";
               inputElement.parentElement.classList.remove("invalid");
            };
         }
      });
   }
}
Validator.isRequired = function (selector) {
   return {
      selector: selector,
      test: function (value) {
         return value.trim() ? undefined : "Vui lòng nhập trường này";
      },
   };
};
Validator.isEmail = function (selector) {
   return {
      selector: selector,
      test: function (value) {
         let regex = new RegExp(
            "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}"
         );
         return regex.test(value) ? undefined : "Email không hợp lệ";
      },
   };
};
Validator.isPhone = function (selector) {
   return {
      selector: selector,
      test: function (value) {
         let regex = new RegExp(
            "^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$"
         );
         return regex.test(value) ? undefined : "Phone không hợp lệ";
      },
   };
};
Validator.isSelect = function (selector) {
   return {
      selector: selector,
      test: function (value) {
         return value ? undefined : "Vui lòng chọn một tuỳ chọn";
      },
   };
};
Validator({
   form: "#dialog__form",
   errorSelector: ".dialog__error",
   rules: [
      Validator.isRequired("#name"),
      Validator.isRequired("#phone"),
      Validator.isRequired("#address"),
      Validator.isRequired("#email"),
      Validator.isPhone("#phone"),
      Validator.isEmail("#email"),
      Validator.isSelect("#provinces"),
      Validator.isSelect("#districts"),
      Validator.isSelect("#wards"),
   ],
});
