import React from 'react'
import { Button } from '@mui/material';

const CreatePost = () => {
    
    return (
        <>
            <section>
                <div>
                    image

                </div>
                <main>
                    <div>
                        <h1>Create New Post</h1>
                        <Button>Share</Button>
                    </div>
                    <div>
                        <div>
                            <img src="" alt="" />
                            <div>
                                <h1>Alex Rivera</h1>
                                <h3>User id</h3>
                            </div>
                        </div>
                        <textarea name="Write your caption here" id=""></textarea>
                    </div>
                </main>
            </section>
        </>
    )
}

export default CreatePost;