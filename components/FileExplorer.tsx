'use client'
import React from 'react'
import { Button } from './ui/button'
import { ArrowLeft, Folder } from 'lucide-react'
import { getSubFolders } from '@/lib/data'
import { toast } from "sonner"

interface FileObject {
    name: string;
}

const FileExplorer = ({ data }: { data: any }) => {
    const [activeFolder, setActiveFolder] = React.useState<string | null>(null)
    const [folderStack, setFolderStack] = React.useState<FileObject[][]>([])
    const [selectedFolders, setSelectedFolders] = React.useState<string[]>([])

    // Function to handle opening folders
    const handleOpenFolder = async (folderName: string, level: number) => {
        try {
            const newSelectedFolders = [...selectedFolders.slice(0, level), folderName]; // Ensure correct path selection
            const newPath = newSelectedFolders.join('/');

            const response = await getSubFolders(newPath);

            if (response.success && response.data) {
                setSelectedFolders(newSelectedFolders);
                setActiveFolder(newPath);
                setFolderStack((prev) => {
                    const newStack = [...prev];
                    newStack[level] = response.data; // Store folders at the correct level
                    return newStack.slice(0, level + 1); // Trim unnecessary levels if navigating backward
                });
            } else {
                console.error(response.error);
                toast.error('An error occurred while fetching subfolders');
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred while fetching subfolders');
        }
    }

    // Function to handle going back
    const handleGoBack = () => {
        if (folderStack.length > 0) {
            setFolderStack((prev) => {
                const newStack = prev.slice(0, -1) // Remove last level
                return newStack
            })

            // Set active folder to the previous level or null if back to root
            if (folderStack.length > 1) {
                console.log(activeFolder?.slice(0, activeFolder.lastIndexOf('/')))
                setActiveFolder(activeFolder?.slice(0, activeFolder.lastIndexOf('/')) || null)
            } else {
                setActiveFolder(null) // Back to root
            }
        }
    }

    return (
        <div className='w-full'>
            {/* Header */}
            <div className='w-full h-[42px] bg-gray-400/45 rounded-t-md p-1 items-center'>
                <div className='flex flex-row gap-2 items-center'>
                    {folderStack.length > 0 && (
                        <Button 
                            variant='ghost' 
                            className='rounded-full'
                            onClick={handleGoBack} // Call handleGoBack on click
                        >
                            <ArrowLeft className='size-3' />
                        </Button>
                    )}
                    <p className={activeFolder === null ? `mt-2 ml-2 text-muted-foreground text-sm` : `text-muted-foreground text-sm`}>
                        {activeFolder || 'Root'}
                    </p>
                </div>
            </div>

            {data ? (
                <div className='border border-gray-400/45 rounded-b-md'>
                    <div className='grid grid-cols-4 gap-2 p-2'>
                        {/* Root Level Folders */}
                        <div className='w-full'>
                            {data.map((file: FileObject, index: number) => (
                                <div
                                    key={index}
                                    onClick={() => handleOpenFolder(file.name, 0)}
                                    className='flex flex-row items-center gap-2 p-2 border border-gray-400/45 rounded-md cursor-pointer'
                                >
                                    <Folder size={20} />
                                    <p>{file.name}</p>
                                </div>
                            ))}
                        </div>

                        {/* Dynamically Render Subfolders for Each Level */}
                        {folderStack.map((folders, level) => (
                            <div key={level} className="w-full">
                                {folders.map((file: FileObject, index: number) => (
                                    <div
                                        key={index}
                                        onClick={() => handleOpenFolder(file.name, level + 1)}
                                        className={`flex flex-row items-center gap-2 p-2 border border-gray-400/45 rounded-md cursor-pointer ${
                                            selectedFolders[level] === file.name ? 'bg-gray-300' : ''
                                        }`}
                                    >
                                        <Folder size={20} />
                                        <p>{file.name}</p>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p>No folders available</p>
            )}
        </div>
    )
}

export default FileExplorer
