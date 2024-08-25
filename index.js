import inquirer from "inquirer";
// Bank Account class
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    // Debit mony
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Successfully withdrew ${amount}. Remaining balance: ${this.balance}`);
        }
        else {
            console.log("Insufficient balance.");
        }
    }
    //Credit mony
    deposit(amount) {
        if (amount > 100) {
            amount -= 1;
        }
        this.balance += amount;
        console.log(`Successfully deposited ${amount}. Remaining balance: ${this.balance}`);
    }
    //check balance
    checkBalance() {
        console.log(`Your current balance is ${this.balance}`);
    }
}
// Customer class
class Customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
//create bank accounts
const accounts = [
    new BankAccount(1001, 1000),
    new BankAccount(1002, 2000),
    new BankAccount(1003, 3000)
];
// Creat customers
const customers = [
    new Customer("Sami", "Ullah", "Male", 30, 9876543210, accounts[0]),
    new Customer("Aqsa", "Sami", "Female", 25, 9876543211, accounts[1]),
    new Customer("Ali", "Muhammad", "Male", 35, 9876543212, accounts[2])
];
// Function to interact with bank accounts
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter your account number:"
        });
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber);
        if (customer) {
            console.log(`Welcome, ${customer.firstName} ${customer.lastName}\n`);
            const ans = await inquirer.prompt([{
                    name: "select",
                    type: "list",
                    message: "Select an operation",
                    choices: ["Deposit", "Withdraw", "Check Balance", "Exit"]
                }]);
            switch (ans.select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the deposit amount:"
                    });
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the withdraw:"
                    });
                    customer.account.withdraw(withdrawAmount.amount);
                    break;
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log("Thank you for using our banking system. Goodbye!");
                    return;
            }
        }
        else {
            console.log("Invalid account number. Please try again.");
        }
    } while (true);
}
service();
