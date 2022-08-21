describe("Payments test (with setup and tear-down", function() {
    beforeEach(function () {
        // use default values of 100 for the bill and 20 for the tip, making the tip percentage 20%
        billAmtInput.value = 100;
        tipAmtInput.value = 20;
    });

    it('should add a new payment to allPayments on submitPaymentInfo()', function() {
        // first submit the info using the default values set in beforeEach
        submitPaymentInfo();

        // verify that there is one payment with a bill of 100, and tip of 20, with 20% tip percentage
        expect(Object.keys(allPayments).length).toEqual(1);
        expect(allPayments['payment1'].billAmt).toEqual('100');
        expect(allPayments['payment1'].tipAmt).toEqual('20');
        expect(allPayments['payment1'].tipPercent).toEqual(20);
    });

    it('should not add a new payment on submitPaymentInfo() with empty input', function () {
        // set the billAmt to null and submit the payment info, which should result in nothing being submitted
        billAmtInput.value = '';
        submitPaymentInfo();
    
        // verify that there are no payments 
        expect(Object.keys(allPayments).length).toEqual(0);
    });

    it('should payment update #paymentTable on appendPaymentTable()', function () {
        // make the current payment and append it to the table
        let curPayment = createCurPayment();
        allPayments['payment1'] = curPayment;
        appendPaymentTable(curPayment);
        
        // get the list of each cell in the newly created row
        let curTdList = document.querySelectorAll('#paymentTable tbody tr td');
        
        // list should be 4 cells long, with $100 in the first (billAmt), $20 in the second (tipAmt), 20% in the third (tipPercent), and the delete button in the last
        expect(curTdList.length).toEqual(4);
        expect(curTdList[0].innerText).toEqual('$100');
        expect(curTdList[1].innerText).toEqual('$20');
        expect(curTdList[2].innerText).toEqual('20%');
        expect(curTdList[3].innerText).toEqual('X');
    });

    it('should create a new payment on createCurPayment()', function () {
        // test createCurPayment by making an example payment and verifying that it is equal to the one returned by createCurPayment()
        let expectedPayment = {
          billAmt: '100',
          tipAmt: '20',
          tipPercent: 20,
        }
    
        expect(createCurPayment()).toEqual(expectedPayment);
      });

      it('should not create payment with empty input on createCurPayment()', function () {
        // now run createCurPayment but with empty values, as it should return nothing
        billAmtInput.value = '';
        tipAmtInput.value = '';
        let curPayment = createCurPayment();
    
        expect(curPayment).toEqual(undefined);
      });

      // reset everything after each function
      afterEach(function() {
        billAmtInput.value = '';
        tipAmtInput.value = '';
        paymentTbody.innerHTML = '';
        summaryTds[0].innerHTML = '';
        summaryTds[1].innerHTML = '';
        summaryTds[2].innerHTML = '';
        serverTbody.innerHTML = '';
        paymentId = 0;
        allPayments = {};
      });
});