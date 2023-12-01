import { useMemo, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap"
import { Link } from "react-router-dom"
import ReactSelect from "react-select";
import { Tag } from "./App";
import { NoteCard } from "./NoteCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';


type simplifiedNote = {
    tags: Tag[]
    title: string
    id: string
}

type NoteListProps = {
    availableTags:Tag[]
    notes: simplifiedNote[]
}



export function NoteList({availableTags, notes}: NoteListProps) {
    
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [title, setTitle] = useState<string>("");
    
    const filteredNotes = useMemo(() => {
        return notes.filter(note => {
            return (
                (title === "" || 
                    note.title.toLowerCase().includes(title.toLowerCase())) &&
            (selectedTags.length === 0 ||
                selectedTags.every(tag => 
                note.tags.some(noteTag => noteTag.id === tag.id)
                ))
            )
        })
    },[title, selectedTags, notes])

    console.log(filteredNotes)

    return (
    <>
    
    <Row className="align-items-center mb-5">
        
    <Col>
      <u><h1 style={{ fontFamily: 'Shadows Into Light, cursive', fontWeight: 1000, fontSize:70 }}>
        Digital Sticky Notes
      </h1></u>
    </Col>
        <Col xs="auto"> 
            <Stack gap={2} direction="horizontal">
                <Link to="/new">
                    <Button variant="danger">Create</Button>
                </Link>
            </Stack>
        </Col>
    </Row>
    <Form>
        <Row className="mb-4">
            <Col>
            <Form.Group controlId="title">
        <Form.Label>
          <span>Title  </span>
          <FontAwesomeIcon icon={faFilter} className="ml-2" />
        </Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Type any word or a part of word...."
        />
      </Form.Group>
            </Col>
            <Col>
            <Form.Group controlId="tags">
                        <Form.Label><span>Tags </span>
          <FontAwesomeIcon icon={faFilter} className="ml-2" /></Form.Label>
                        <ReactSelect 
                        value={selectedTags.map(tag => {
                            return { label:tag.label, value:tag.id}
                        })} 
                        options={availableTags.map(tag => {
                            return {label:tag.label, value: tag.id}
                        })}         
                        onChange={tags=> {
                            setSelectedTags(
                                tags.map(tag=>{
                                    return {label:tag.label, id: tag.value}
                                })
                            )
                        }} 
                        isMulti 
                        styles={{
                            control: (provided) => ({
                              ...provided,
                              backgroundColor: 'white',
                              borderColor: 'black', // Border color
                            }),
                          }}/>
                    </Form.Group>
            </Col>
        </Row>
    </Form>
    <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
    {filteredNotes.map((note) => (
    <Col key={note.id}>
        <NoteCard id={note.id} title={note.title} tags={note.tags} />
    </Col>
    ))}

    </Row>
    </>
    )
}

  