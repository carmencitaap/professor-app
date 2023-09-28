import React from 'react';

function XPTable() {
    return (
        <table className="w-1/4 text-sm text-left text-gray-800 dark:text-gray-400 mt-3 mb-3 ml-12">
            <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                <tr>
                    <th> XP </th>
                    <th> Level </th>
                </tr>
            </thead>
            <tbody>
                <tr className="border-b hover:bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                    <td className="whitespace-nowrap px-2 py-1"> [0,250[ </td>
                    <td className="whitespace-nowrap px-2 py-1"> 1 </td>
                </tr>

                <tr className="border-b hover:bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                    <td className="whitespace-nowrap px-2 py-1"> [250, 400[ </td>
                    <td className="whitespace-nowrap px-2 py-1"> 2 </td>
                </tr>

                <tr className="border-b hover:bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                    <td className="whitespace-nowrap px-2 py-1"> [400, 500[ </td>
                    <td className="whitespace-nowrap px-2 py-1"> 3 </td>
                </tr>

                <tr className="border-b hover:bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                    <td className="whitespace-nowrap px-2 py-1"> [500, 550[ </td>
                    <td className="whitespace-nowrap px-2 py-1"> 4 </td>
                </tr>

                <tr className="border-b hover:bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                    <td className="whitespace-nowrap px-2 py-1"> [550, 650[ </td>
                    <td className="whitespace-nowrap px-2 py-1"> 5 </td>
                </tr>

                <tr className="border-b hover:bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                    <td className="whitespace-nowrap px-2 py-1"> [650, 800[ </td>
                    <td className="whitespace-nowrap px-2 py-1"> 6 </td>
                </tr>

                <tr className="border-b hover:bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                    <td className="whitespace-nowrap px-2 py-1"> [800, 950[ </td>
                    <td className="whitespace-nowrap px-2 py-1"> 7 </td>
                </tr>

                <tr className="border-b hover:bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                    <td className="whitespace-nowrap px-2 py-1"> [950, 1050[ </td>
                    <td className="whitespace-nowrap px-2 py-1"> 8 </td>
                </tr>

                <tr className="border-b hover:bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                    <td className="whitespace-nowrap px-2 py-1"> [1050, 1200[ </td>
                    <td className="whitespace-nowrap px-2 py-1"> 9 </td>
                </tr>

                <tr className="border-b hover:bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                    <td className="whitespace-nowrap px-2 py-1"> 1200 or more </td>
                    <td className="whitespace-nowrap px-2 py-1"> 10 </td>
                </tr>
            </tbody>
        </table>

    )
}

export default XPTable;