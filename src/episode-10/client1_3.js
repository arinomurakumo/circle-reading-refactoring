// client1

const rawSite = acquireSiteData();
const site = enrichSite(rawSite);
const aCustomer = site.customer;
// ... 大量のコードが入る ...

let customerName;
if (isUnknown(aCustomer)) customer.Name = "occupant";
else customerName = aCustomer.name;

function enrichSite(inputSite) {
  return _.cloneDeep(inputSite);
}

function isUnknown(aCustomer) {
  return aCustomer === "unknown";
}
