let Input = AMUIReact.Input;
let Form = AMUIReact.Form;
let List = AMUIReact.List;
let ListItem = AMUIReact.ListItem;
let Grid = AMUIReact.Grid;
let Col = AMUIReact.Col;
let Container = AMUIReact.Container;

let CommentBox = React.createClass({
  getInitialState: function () {
    return {data: []};
  },
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: true,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  handleCommentSubmit: function (comment) {
    // optimistic updates
    let comments = this.state.data;
    comment.id = Date.now();
    comments = comments.concat([comment]);
    this.setState(comments);
    
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function () {
    return (
      <Container className="commentBox">
        <Grid >
          <h1>Comments</h1>
        </Grid>
        <Grid >
          <Col>
            <CommentList data={this.state.data}/>
          </Col>
        </Grid>
        <Grid >
          <Col>
            <CommentForm onCommentSubmit={this.handleCommentSubmit}/>          
          </Col>
        </Grid>
      </Container>
    );
  }
})

let CommentList = React.createClass({
  render: function () {
    let commentNodes = this.props.data.map((comment) => {
      return (
        <Comment author={comment.author} key={comment.id}>
          {comment.text}
        </Comment>
      )
    })
    
    return (
      <List static={true} className="commentList">      
        {commentNodes}
      </List>
    );
  }
});

let CommentForm = React.createClass({
  getInitialState: function() {
    return {author: '', text: ''}
  },
  handleAuthorChange: function(e) {
    this.setState({author: e.target.value});
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    let author = this.state.author;
    let text = this.state.text;
    if(!author || !text) return;
    this.setState({author: '', text: ''});
    this.props.onCommentSubmit({author, text});
  },
  render: function () {
    return (
      <Form className="commentForm" onSubmit={this.handleSubmit}>
        <Input label="Name:" type="text" placeholder="Your name, sir" value={this.state.author} onChange={this.handleAuthorChange} />
        <Input label="Text:" type="textarea" placeholder="Say something..." value={this.state.text} onChange={this.handleTextChange} />
        <Input type="submit" value="Post" />
      </Form>
    );
  }
});

let Comment = React.createClass({  
  rawMarkup: function () {
    let md = new Remarkable();
    let rawMarkup = md.render(this.props.children.toString());
    return {__html: rawMarkup}
  },
  render: function () {
    
    return (
      <ListItem className="comment">
        <strong >{this.props.author}</strong>: 
        <span dangerouslySetInnerHTML={this.rawMarkup()}></span>
      </ListItem>        
    );
  }
});

ReactDOM.render(
  <CommentBox url="/api/comments" pollInterval={2000}/>,
  document.getElementById('content')
)
