import { Box, Button, Card, Input, TextField } from '@mui/material'
import { ApprovalOutlined } from '@mui/icons-material'
import PanoramaIcon from '@mui/icons-material/Panorama'

export default function PostInputJsx({ postInput, setPostInput, handlePostSubmit }) {
  return (
    <>
      <Card elevation={3} style={{ marginBlock: '6%' }}>
        <form
          className=''
          style={{ maxWidth: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onSubmit={handlePostSubmit}
        >
          <TextField
            style={{ width: '100%' }}
            required
            value={postInput}
            className='post-input '
            placeholder='Create New Post'
            onChange={(e) => setPostInput(e.target.value)}
            size='small'
            multiline
            type='text'
            maxRows={4}
          />

          <div>
            <Button
              color='secondary'
              type='submit'
              id='post-button'
              variant='outlined'
              size='small'
              style={{}}
            >
              Post
            </Button>
          </div>
        </form>
      </Card>
    </>
  )
}
