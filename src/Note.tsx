import { Badge, Button, Col, Row, Stack } from "react-bootstrap"
import { useNote } from "./NoteLayout"
import { Link, useNavigate } from "react-router-dom"
import ReactMarkdown from "react-markdown"

type NoteProps = {
    onDelete: (id:string) => void
}

const borderStyle = {
    border: "1px solid #ced4da", // Define the border style
    borderRadius: "5px", // Optional: Define border radius for rounded corners
    padding: "10px", // Optional: Add padding for better appearance
    backgroundColor: "#fff9c4", // Light yellowish color
    // border: "1px solid #ffee58", // Border color
    boxShadow: "1px 1px 4px 1px #ccc", // Optional: Add shadow for depth
  };

export function Note({onDelete}:NoteProps) {

    const note = useNote()
    const navigate = useNavigate()

    return <>
    <Row className="align-items-center mb-4">
        <Col>
        <h1>{note.title}</h1>
        {
            note.tags.length > 0 && (
                <Stack gap ={1}
                      direction="horizontal"
                      className="flex-wrap"
                      >
                        {note.tags.map(tag => (
                            <Badge className = "text-truncate" key={tag.id}>
                                {tag.label}
                            </Badge>
                        ))}
                    </Stack>
            )
        }
        </Col>

        <Col xs="auto"> 
            <Stack gap={2} direction="horizontal">
                <Link to={`/${note.id}/edit`}>
                    <Button variant="primary">Edit</Button>
                </Link>
                    <Button onClick={() => {
                        onDelete(note.id)
                        navigate("/")
                    }} variant="danger">Delete
                    </Button>
                    <Link to="/">
                    <Button variant="secondary">Back
                    </Button>
                    </Link>
            </Stack>
        </Col>
    </Row>
    <div style={borderStyle}>
<ReactMarkdown>
    {note.markdown}
</ReactMarkdown>
</div>

    </>
}