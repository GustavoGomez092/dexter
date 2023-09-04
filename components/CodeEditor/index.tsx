'use client'

import Editor from '@monaco-editor/react';

const CodeEditor = () => {


  const value = `
  /**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} modify nums1 in-place and return it.
 */
var merge = function(nums1, m, nums2, n) {
    
};`

  return(
    <>
    <div className="flex items-center justify-between mb-2">
      <p className="text-gray-500">JavaScript</p>
      <button className="btn btn-outline btn-sm btn-primary">Test code</button>
    </div>
    <Editor height="100%" defaultLanguage="javascript" options={{
    fontSize: 16,
    minimap: {
      enabled: false
    },
    wordWrap: "on",
  }} defaultValue={value} theme="vs-dark"  />
    </>
  )
}

export default CodeEditor;