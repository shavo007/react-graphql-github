import React from 'react';
import {  ApolloConsumer } from 'react-apollo';

import { withState } from 'recompose';

import Button from '../../Button';
import Comments from '../../Comment';
import Link from '../../Link';

import { GET_COMMENTS_OF_ISSUE } from '../../Comment/CommentList/queries';


import './style.css';

const prefetchIssues = (
  client,
  repositoryOwner,
  repositoryName,
  issue,
) => {
    client.query({
      query: GET_COMMENTS_OF_ISSUE,
      variables: {
         repositoryOwner,
         repositoryName,
         number: issue.number,
      },
    });
};



const IssueItem = ({
  issue,
  repositoryOwner,
  repositoryName,
  isShowComments,
  onShowComments,
}) => (
 <ApolloConsumer>
   {client => (
  <div className="IssueItem">

    <Button onClick={() => onShowComments(!isShowComments)}
   onMouseOver={() =>
	 prefetchIssues(
	   client,
	   repositoryOwner,
	   repositoryName,
	   issue
	 )
   }>
      {isShowComments ? '-' : '+'}
    </Button>

    <div className="IssueItem-content">
      <h3>
        <Link href={issue.url}>{issue.title}</Link>
      </h3>
      <div dangerouslySetInnerHTML={{ __html: issue.bodyHTML }} />

      {isShowComments && (
        <Comments
          repositoryOwner={repositoryOwner}
          repositoryName={repositoryName}
          issue={issue}
        />
      )}
    </div>
  </div>
  )}
</ApolloConsumer>
);

export default withState('isShowComments', 'onShowComments', false)(
  IssueItem,
);
