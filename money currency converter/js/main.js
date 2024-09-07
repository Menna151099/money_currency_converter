// نجلب بيانات الطقس من api
// عندما تكون الصفحه جاهزه يتم تنفيذ الكود
// عمل مربع لادخال المبلغ
// قائمتين منسدله للعملات المدخله 
// مكان لعرض النتيجه
// نستخدم fetchلجلب قئمه العملات من api 
// للتاكد من الاستخدام نستخدم if
// اضافه العملات عن طريق foreach
// تنفيذ عملية التحويل عند الضغط على زر التحويل 
// جلب سعر الصرف من api عن طريق fetch

const API_URL = `https://v6.exchangerate-api.com/v6/0e0e283a1eb00046884c57b7/latest/USD`;

document.addEventListener("DOMContentLoaded", function () {
    const amount = document.getElementById("amount");
    const fromCurrency = document.getElementById("fromCurrency");
    const toCurrency = document.getElementById("toCurrency");
    const result = document.getElementById("result");

    // جلب قائمة العملات
    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('API Data:', data); 
            const currencies = Object.keys(data.conversion_rates);
            console.log('Currencies:', currencies); 
            
            currencies.forEach(currency => {
                const option1 = document.createElement("option");
                option1.value = currency;
                option1.text = currency;
                fromCurrency.appendChild(option1);

                const option2 = document.createElement("option");
                option2.value = currency;
                option2.text = currency;
                toCurrency.appendChild(option2);
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

    // تنفيذ عملية التحويل
    document.getElementById("convert").addEventListener("click", function () {
        const fromValue = fromCurrency.value;
        const toValue = toCurrency.value;
        const amountValue = amount.value;

        fetch(`https://v6.exchangerate-api.com/v6/0e0e283a1eb00046884c57b7/latest/${fromValue}`)
            .then(response => response.json())
            .then(data => {
                const rate = data.conversion_rates[toValue];
                const convertedAmount = amountValue * rate;
                result.textContent = `${amountValue} ${fromValue} = ${convertedAmount.toFixed(2)} ${toValue}`;
            })
            .catch(error => {
                console.error('Error fetching conversion rate:', error);
            });
    });
});
