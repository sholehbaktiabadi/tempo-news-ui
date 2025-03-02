import axios from 'axios';
import { useEffect, useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/react";
import './App.css';
import { env } from './config/env';

export default function App() {
  const [data, setData] = useState<{ id: number; title: string; content: string; author: string }[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [authorQuery, setAuthorQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<{ id?: number; title: string; content: string; author: string }>({ title: '', content: '', author: '' });
  const [editData, setEditData] = useState<{ id?: number; title: string; content: string; author: string }>({ title: '', content: '', author: '' });

  const getArticles = async () => {
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append("search", searchQuery);
      if (authorQuery) params.append("author", authorQuery);

      const { data } = await axios.get(`${env.VITE_API_BASE_URL}/api/v1/article?${params.toString()}`);
      setData(data.data || []);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      getArticles();
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [searchQuery, authorQuery]);

  const handleCreateOrUpdate = async () => {
    try {
      if (editData.id) {
        await axios.patch(`${env.VITE_API_BASE_URL}/api/v1/article/${editData.id}`, editData);
      } else {
        await axios.post(`${env.VITE_API_BASE_URL}/api/v1/article`, editData);
      }
      setModalOpen(false);
      getArticles();
    } catch (error) {
      console.error("Error saving article:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this article?")) {
      try {
        await axios.delete(`${env.VITE_API_BASE_URL}/api/v1/article/${id}`);
        getArticles();
      } catch (error) {
        console.error("Error deleting article:", error);
      }
    }
  };

  return (
    <>
      <div className="flex gap-2 pb-2">
        <Input isClearable className="dark w-full" placeholder="Search by title and content" value={searchQuery} onValueChange={setSearchQuery} />
        <Input isClearable className="dark w-full" placeholder="Search by author" value={authorQuery} onValueChange={setAuthorQuery} />
        <Button onPress={() => { setEditData({ title: '', content: '', author: '' }); setModalOpen(true); }}>+ Add</Button>
      </div>

      <Table className="dark" aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>TITLE</TableColumn>
          <TableColumn>CONTENT</TableColumn>
          <TableColumn>AUTHOR</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {data.map(({ id, title, content, author }) => (
            <TableRow key={id}>
              <TableCell>{id}</TableCell>
              <TableCell>{title}</TableCell>
              <TableCell>{content}</TableCell>
              <TableCell>{author}</TableCell>
              <TableCell className="flex gap-2">
                <Button size="sm" color="primary" onPress={() => { setSelectedArticle({ id, title, content, author }); setViewModalOpen(true); }}>View</Button>
                <Button size="sm" color="warning" onPress={() => { setEditData({ id, title, content, author }); setModalOpen(true); }}>Edit</Button>
                <Button size="sm" color="danger" onPress={() => handleDelete(id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <ModalContent className="dark">
          <ModalHeader>{editData.id ? "Edit Article" : "Create Article"}</ModalHeader>
          <ModalBody>
            <Input className="w-full mb-2" placeholder="Title" value={editData.title} onValueChange={(value) => setEditData((prev) => ({ ...prev, title: value }))} />
            <Input className="w-full mb-2" placeholder="Content" value={editData.content} onValueChange={(value) => setEditData((prev) => ({ ...prev, content: value }))} />
            <Input className="w-full" placeholder="Author" value={editData.author} onValueChange={(value) => setEditData((prev) => ({ ...prev, author: value }))} />
          </ModalBody>
          <ModalFooter>
            <Button onPress={() => setModalOpen(false)}>Cancel</Button>
            <Button color="primary" onPress={handleCreateOrUpdate}>{editData.id ? "Update" : "Create"}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={viewModalOpen} onClose={() => setViewModalOpen(false)}>
        <ModalContent className="dark">
          <ModalHeader>Article Details</ModalHeader>
          <ModalBody>
            <p className='font-bold mb-2'>{selectedArticle.title}</p>
            <p className='text-sm mb-2'>{selectedArticle.content}</p>
            <p>published by: {selectedArticle.author}</p>
          </ModalBody>
          <ModalFooter>
            <Button onPress={() => setViewModalOpen(false)}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
