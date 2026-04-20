// components/TeamNotes.js
import { useState, useEffect } from 'react';
import {
  NotesSection,
  NoteItem,
  NoteHeader,
  NoteAuthor,
  NoteDate,
  NoteText,
  NoteForm,
  NoteInput,
  NoteTextarea,
  NoteButton,
  DeleteButton,
  EmptyNotesMessage,
} from './styles';

export default function TeamNotes({ teamId, teamName, season }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, [teamId]);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/notes?teamId=${teamId}`);
      const data = await res.json();
      setNotes(data.notes || []);
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teamId, teamName, season, author, text }),
      });

      if (res.ok) {
        setText('');
        setAuthor('');
        fetchNotes(); // Refresh notes
      } else {
        const error = await res.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error posting note:', error);
      alert('Failed to post note');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (noteId) => {
    if (!confirm('Delete this note?')) return;

    try {
      const res = await fetch(`/api/notes?id=${noteId}`, { method: 'DELETE' });
      if (res.ok) {
        fetchNotes();
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <NotesSection>
      <h4 style={{ color: '#FFB81C', marginTop: 0, marginBottom: '15px' }}>
        📝 Notes for {teamName} ({season})
      </h4>

      {loading ? (
        <EmptyNotesMessage>Loading notes...</EmptyNotesMessage>
      ) : notes.length === 0 ? (
        <EmptyNotesMessage>No notes yet. Be the first to add one!</EmptyNotesMessage>
      ) : (
        notes.map((note) => (
          <NoteItem key={note._id}>
            <NoteHeader>
              <NoteAuthor>{note.author}</NoteAuthor>
              <div>
                <NoteDate>{formatDate(note.createdAt)}</NoteDate>
                <DeleteButton 
                  onClick={() => handleDelete(note._id)}
                  title="Delete note"
                >
                  🗑️
                </DeleteButton>
              </div>
            </NoteHeader>
            <NoteText>{note.text}</NoteText>
          </NoteItem>
        ))
      )}

      <NoteForm onSubmit={handleSubmit}>
        <NoteInput
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Your name (optional)"
          maxLength={50}
        />
        <NoteTextarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={`Share your thoughts about ${teamName}'s ${season} season...`}
          maxLength={500}
          required
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: 'rgba(232, 232, 232, 0.5)', fontSize: '0.85rem' }}>
            {text.length}/500 characters
          </span>
          <NoteButton type="submit" disabled={submitting || !text.trim()}>
            {submitting ? 'Posting...' : '📌 Post Note'}
          </NoteButton>
        </div>
      </NoteForm>
    </NotesSection>
  );
}