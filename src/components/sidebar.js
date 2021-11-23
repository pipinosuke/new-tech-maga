import React from "react"
import CardSmall from "./cardSmall"
import Card from "./card"

const Sidebar = ({ poplularPosts }) => {
    return (
        <div className="sidebar">
            <h2 className="sidebar-header">メンバーシップ</h2>
        <div className="sidebar-emails">
          <h2>Slackメンバーシップに加入する</h2>
          <p>交流できます</p>
          <form>
            <input type="text" id="email" aria-label="email" />
            <input
              type="submit"
              value="Subscribe"
              aria-label="subscribe"
            />{" "}
          </form>
          <span>Weekly updates, unsubscribe at any time</span>
            </div>
            <h2 className="sidebar-header">人気の記事</h2>
            {/* 今は最新の記事を表示しているだけ。analyticsのPV数からsortして取得したい */}
            <div>
          {poplularPosts.map(({ node }, index) => {
            if (index > 2 && index < 5) {
              return (
                <CardSmall
                  key={node.id}
                  slug={node.slug}
                  content={JSON.parse(node.content)}
                />
              )
            } else return null
          })}
            </div>
        </div>
  )
}
export default Sidebar
