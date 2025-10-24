const CommentData = [
  {
    name: 'Akshay',
    text: 'This video is amazing!',
    replies: [
      {
        name: 'Brian',
        text: 'I totally agree with you!',
        replies: [
          {
            name: 'Sophia',
            text: 'Same here, loved the content!',
            replies: [],
          },
        ],
      },
    ],
  },
  {
    name: 'Ethan',
    text: 'Nice explanation!',
    replies: [
      {
        name: 'Olivia',
        text: 'This part was really helpful.',
        replies: [
          {
            name: 'Liam',
            text: 'I learned something new today.',
            replies: [
              {
                name: 'Mia',
                text: 'Thanks for sharing this information.',
                replies: [
                  {
                    name: 'Noah',
                    text: 'Waiting for more videos like this!',
                    replies: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'John',
    text: 'Great work, keep it up!',
  },
  {
    name: 'Reddy',
    text: 'Very informative content!',
  },
]

const Comment = ({ data }) => {
  const { name, text, replies } = data
  return (
    <div className="flex shadow-sm bg-gray-100 p-2 rounded-lg my-2">
      {' '}
      <img
        className="w-12 h-12"
        alt="userImage"
        src="https://cdn-icons-png.flaticon.com/128/3033/3033143.png"
      />
      <div className="px-3">
        <p className="font-bold">{name}</p>
        <p>{text}</p>
      </div>
    </div>
  )
}

const CommentList = ({ comments }) => {
  if (!comments) return null
  return (
    <div>
      {' '}
      {comments.map((comment, index) => {
        return (
          <div key={index}>
            {' '}
            <Comment data={comment} />{' '}
            <div className="p-5 border border-l-black">
              <CommentList comments={comment.replies} />
            </div>{' '}
          </div>
        )
      })}{' '}
    </div>
  )
}

const CommentContainer = () => {
  return (
    <div className="m-5 p-2">
      <h1 className="text-2xl font-bold"> Comments</h1>
      <CommentList comments={CommentData} />
    </div>
  )
}

export default CommentContainer
