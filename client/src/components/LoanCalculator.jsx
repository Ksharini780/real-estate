import { useState, useEffect } from "react";

const LoanCalculator = ({ regularPrice, discountPrice }) => {
  // Use discount price if available, otherwise use regular price
  const propertyPrice = discountPrice || regularPrice || 0;


  const [loanAmount, setLoanAmount] = useState(propertyPrice);
  const [interestRate, setInterestRate] = useState(6.5); // Default 6.5%
  const [loanTerm, setLoanTerm] = useState(20); // Default 20 years
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  useEffect(() => {
    calculateLoan();
  }, [loanAmount, interestRate, loanTerm]);

  const calculateLoan = () => {
    const principal = Number(loanAmount);
    const monthlyInterest = Number(interestRate) / 100 / 12;
    const numPayments = Number(loanTerm) * 12;

    if (numPayments === 0) return;

    const monthly =
      monthlyInterest === 0
        ? principal / numPayments
        : (principal * monthlyInterest) /
          (1 - Math.pow(1 + monthlyInterest, -numPayments));

    setMonthlyPayment(monthly.toFixed(2));
  };

  // Format price safely
  const formattedPrice = propertyPrice ? Number(propertyPrice).toLocaleString("en-US") : "0";

  return (
    <div className="border border-gray-300 p-4 rounded-lg bg-gray-100 shadow-md max-w-xs mt-4">
    <h3 className="text-lg font-semibold mb-2">Loan Calculator</h3>
    <p className="text-base mb-3 hidden">Property Price: ₹ {formattedPrice}</p>
  
    <label className="block font-medium text-sm">Loan Amount:</label>
    <input 
      type="number" 
      className="w-full p-2 border border-gray-400 rounded-md mt-1"
      value={loanAmount} 
      onChange={(e) => setLoanAmount(Number(e.target.value))} 
    />
  
    <label className="block font-medium text-sm mt-2">Interest Rate (%):</label>
    <input 
      type="number" 
      step="0.1" 
      className="w-full p-2 border border-gray-400 rounded-md mt-1"
      value={interestRate} 
      onChange={(e) => setInterestRate(Number(e.target.value))} 
    />
  
    <label className="block font-medium text-sm mt-2">Loan Term (Years):</label>
    <input 
      type="number" 
      className="w-full p-2 border border-gray-400 rounded-md mt-1"
      value={loanTerm} 
      onChange={(e) => setLoanTerm(Number(e.target.value))} 
    />
  
    <h4 className="mt-3 text-lg font-semibold text-gray-700">
      Estimated Monthly Payment: ₹ {monthlyPayment}
    </h4>
  </div>
  
  );
};

export default LoanCalculator;
