import React from "react";

import 'font-awesome/css/font-awesome.min.css'
import './AppPage.css'
import Loader from "../../components/Loader/Loader";


export class AppPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: null,
            data: null,
            length: null,
            loading: false,
            tweets: [],
            answer: ""

        }
    }

    fetch_subset = async (keyword) => {
        const url = `http://143.233.226.88:2004/rag/llm-summarizer-news/?query=${keyword}&topN=5`

        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({ 
                tweets: data.top_similar_chunks,
                answer: data.llm_summary,
                keyword: keyword,
                loading: false,
            }))
    }

    handle_key_down = (e) => {
        if (e.key === "Enter") {
            this.setState({ keyword: e.target.value, loading: true })
            this.fetch_subset(e.target.value)
        }
    }

    scroll_to_top = () => {
        window.scrollTo({top: 0, behavior: 'smooth'})
    }

    render() {
        return (
            <div className="page-box">
                <div className="search-box">
                    <div className="label-area">
                        <p>Enter a question and find the top similar article news and a summarized answer.</p></div>
                    <div className="search-area">
                        <p>Ask something (in Greek)</p>
                        <input onKeyDown={(e) => {
                            if (e.key === "Enter")
                                this.handle_key_down(e)
                        }} name="myInput" />
                    </div>
                </div>

                {this.state.loading && <Loader isloading={this.state.loading} />}

                                {this.state.keyword && (
                    <div className="search-box-title">
                    {this.state.tweets.length > 0 && <h4>Summarized Answer</h4>}
                         {this.state.tweets.length > 0 && <div className="summarized"><p>{this.state.answer}</p></div> }

                        {this.state.tweets.length > 0 && <h4>Top similar pieces of text</h4>}
                        <div className="tweets">
                        <ul>
                        {this.state.tweets.map((tweet) => (
                            <li key={tweet.id}>
                                <div className="tweet-item">
                                    <div className="cosine-similarity">
                                        <strong>Cosine Similarity: </strong>
                                        {tweet["cosine similarity"].toFixed(2)}
                                    </div>
                                    <div className="tweet-text">
                                    Article: <a href={tweet.url} target="_blank" rel="noreferrer">
                                        {tweet.headline}
                                      </a>
                                      <br />
                                        <p>{tweet.chunk}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                        </div>

                    </div>
                )}
            </div>
        );
    }
}

export default AppPage;