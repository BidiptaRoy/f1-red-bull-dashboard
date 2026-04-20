// pages/api/notes.js
import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'f1dashboard');
    const notesCollection = db.collection('notes');

    // GET - Fetch all notes (optionally filtered by teamId)
    if (req.method === 'GET') {
      const { teamId } = req.query;
      const query = teamId ? { teamId } : {};
      
      const notes = await notesCollection
        .find(query)
        .sort({ createdAt: -1 }) // newest first
        .toArray();
      
      return res.status(200).json({ notes, count: notes.length });
    }

    // POST - Create a new note
    if (req.method === 'POST') {
      const { teamId, teamName, season, author, text } = req.body;

      // Validation
      if (!teamId || !text) {
        return res.status(400).json({ error: 'teamId and text are required' });
      }

      if (text.length > 500) {
        return res.status(400).json({ error: 'Note must be 500 characters or less' });
      }

      const newNote = {
        teamId,
        teamName: teamName || 'Unknown Team',
        season: season || 'N/A',
        author: author?.trim() || 'Anonymous',
        text: text.trim(),
        createdAt: new Date(),
      };

      const result = await notesCollection.insertOne(newNote);
      
      return res.status(201).json({ 
        success: true, 
        note: { ...newNote, _id: result.insertedId }
      });
    }

    // DELETE - Delete a note by ID
    if (req.method === 'DELETE') {
      const { id } = req.query;
      
      if (!id) {
        return res.status(400).json({ error: 'Note ID is required' });
      }

      const { ObjectId } = await import('mongodb');
      const result = await notesCollection.deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Note not found' });
      }

      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Notes API error:', error);
    return res.status(500).json({ 
      error: 'Database operation failed', 
      details: error.message 
    });
  }
}