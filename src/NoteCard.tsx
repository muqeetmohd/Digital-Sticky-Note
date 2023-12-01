import { Card, Stack, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./NotesList.module.css"
import { Tag } from "./App";


type simplifiedNote = {
    tags: Tag[]
    title: string
    id: string
}

const cardStyle = {
    backgroundColor: "#fff171", // Light yellowish color
    border: "1px solid #ffee58", // Border color
    boxShadow: "1px 1px 4px 1px #ccc", // Optional: Add shadow for depth
  };

export function NoteCard({ id, title, tags }: simplifiedNote) {
    return (
      <Card
        as={Link}
        to={`/${id}`}
        className={`h-100 text-reset text-decoration-none ${styles.card}`}
        style={cardStyle}
      >
        <Card.Body className="position-relative"> {}
          <span className="position-absolute top-0 end-0 fs-3" role="img" aria-label="pin">📌</span>
          <Stack gap={2} className="align-item-center justify-content-center h-100">
            <span className="fs-5">{title}</span>
  
            {tags && tags.length > 0 && (
              <Stack
                gap={1}
                direction="horizontal"
                className="justify-content-center flex-wrap"
              >
                {tags.map((tag) => (
                  <Badge className="text-truncate" key={tag.id}>
                    {tag.label}
                  </Badge>
                ))}
              </Stack>
            )}
          </Stack>
        </Card.Body>
      </Card>
    );
  }