# Definition for singly-linked list.
from typing import Optional


class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:

    def addLink(self, prevNode: ListNode, nextNode: ListNode):
        nextToNextNode = prevNode.next
        prevNode.next = nextNode
        nextNode.next = nextToNextNode

    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
        startNode = list1 if list1.val < list2.val else list2;
        ptr1 = list1
        ptr2 = list2
        while (ptr1.next and ptr2.next):
            if ptr1.val < ptr2.val:
                self.addLink(ptr1, ptr2)
                ptr2 = ptr2.next
            else:
                self.addLink(ptr2, ptr1)
                ptr1 = ptr1.next
        if not ptr2.next:
            ptr2.next = ptr1
        if not ptr1.next:
            ptr1.next = ptr2
        
