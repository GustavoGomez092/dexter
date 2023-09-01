'use client'

import Editor from '@monaco-editor/react';

const CodeEditor = () => {


  const value = `
  /**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
    
};`

  return <Editor height="100%" defaultLanguage="javascript" options={{
    fontSize: 16,
    minimap: {
      enabled: false
    },
    wordWrap: "on",
  }} defaultValue={value} theme="vs-dark"  />;
}

export default CodeEditor;