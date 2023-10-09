// client1

const aCustomer = site.customer;
// ... 大量のコードが入る ...

let customerName;
if (aCustomer === "unknown") customerName = "occupant";
else customerName = aCustomer.name;
