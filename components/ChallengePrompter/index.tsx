"use client"

import "github-markdown-css"
import "./style.css"
export default function ChallengePrompter() {
  return (
    <div className="markdown-body p-6">
      <h1>Merge Sorted Array</h1>
      <div className="xFUwe" data-track-load="description_content">
        <p>
          You are given two integer arrays <code>nums1</code> and{" "}
          <code>nums2</code>, sorted in <strong>non-decreasing order</strong>,
          and two integers <code>m</code> and <code>n</code>, representing the
          number of elements in <code>nums1</code> and <code>nums2</code>{" "}
          respectively.
        </p>

        <p>
          <strong>Merge</strong> <code>nums1</code> and <code>nums2</code> into
          a single array sorted in <strong>non-decreasing order</strong>.
        </p>

        <p>
          The final sorted array should not be returned by the function, but
          instead be <em>stored inside the array </em>
          <code>nums1</code>. To accommodate this, <code>nums1</code> has a
          length of <code>m + n</code>, where the first <code>m</code> elements
          denote the elements that should be merged, and the last <code>n</code>{" "}
          elements are set to <code>0</code> and should be ignored.{" "}
          <code>nums2</code> has a length of <code>n</code>.
        </p>

        <p>&nbsp;</p>
        <p>
          <strong className="example">Example 1:</strong>
        </p>

        <pre>
          <strong>Input:</strong> nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6],
          n = 3<br/>
          <strong>Output:</strong> [1,2,2,3,5,6]<br/>
          <strong>Explanation:</strong> The arrays we are merging are [1,2,3]
          and [2,5,6].<br/>
          The result of the merge is [<u>1</u>,<u>2</u>,2,<u>3</u>
          ,5,6] with the underlined elements coming from nums1.
        </pre>

        <p>
          <strong className="example">Example 2:</strong>
        </p>

        <pre>
          <strong>Input:</strong> nums1 = [1], m = 1, nums2 = [], n = 0<br/>
          <strong>Output:</strong> [1]<br/>
          <strong>Explanation:</strong> The arrays we are merging are [1] and
          [].<br/> The result of the merge is [1].
        </pre>

        <p>
          <strong className="example">Example 3:</strong>
        </p>

        <pre>
          <strong>Input:</strong> nums1 = [0], m = 0, nums2 = [1], n = 1<br/>
          <strong>Output:</strong> [1]<br/>
          <strong>Explanation:</strong> The arrays we are merging are [] and
          [1].<br/> The result of the merge is [1].<br/> Note that because m = 0, there
          are no elements in nums1. The 0 is only there to ensure the merge
          result can fit in nums1.
        </pre>

        <p>&nbsp;</p>
        <p>
          <strong>Constraints:</strong>
        </p>

        <ul>
          <li>
            <code>nums1.length == m + n</code>
          </li>
          <li>
            <code>nums2.length == n</code>
          </li>
          <li>
            <code>0 &lt;= m, n &lt;= 200</code>
          </li>
          <li>
            <code>1 &lt;= m + n &lt;= 200</code>
          </li>
          <li>
            <code>
              -10<sup>9</sup> &lt;= nums1[i], nums2[j] &lt;= 10<sup>9</sup>
            </code>
          </li>
        </ul>

        <p>&nbsp;</p>
        <p>
          <strong>Follow up: </strong>Can you come up with an algorithm that
          runs in <code>O(m + n)</code> time?
        </p>
      </div>
    </div>
  )
}
