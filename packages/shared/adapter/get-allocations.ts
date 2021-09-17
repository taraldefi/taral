import { Allocation, AllocationOrAccounts } from "../types";

export default function getAllocations(
  allocations?: AllocationOrAccounts
): Allocation[] {
  if (!allocations) return [];
  if ("deployer" in allocations) {
    return Object.values(allocations).map((a) => ({
      amount: Number(a.balance),
      principal: a.address,
    }));
  } else if (Array.isArray(allocations)) {
    return allocations;
  }
  return [];
}
