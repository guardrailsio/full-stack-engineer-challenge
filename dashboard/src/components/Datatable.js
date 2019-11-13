import React from 'react'

const Datatable = () => (
  <table class='table-auto mx-auto text-gray-200'>
    <thead>
      <tr>
        <th class='px-4 py-2'>Title</th>
        <th class='px-4 py-2'>Author</th>
        <th class='px-4 py-2'>Views</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class='px-4 py-2'>Intro to CSS</td>
        <td class='px-4 py-2'>Adam</td>
        <td class='px-4 py-2'>858</td>
      </tr>
      <tr>
        <td class='px-4 py-2'>
          A Long and Winding Tour of the History of UI Frameworks and Tools and
          the Impact on Design
        </td>
        <td class='px-4 py-2'>Adam</td>
        <td class='px-4 py-2'>112</td>
      </tr>
      <tr>
        <td class='px-4 py-2'>Into to JavaScript</td>
        <td class='px-4 py-2'>Chris</td>
        <td class='px-4 py-2'>1,280</td>
      </tr>
    </tbody>
  </table>
)

export default Datatable
