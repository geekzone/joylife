#!/usr/bin/env python2
#encoding=utf-8
'''
Created on 2014年3月16日

@author: lihan
'''
import requests
import urllib

from component.post2csv import Post, Post2Csver


def getHtmlByPyquery(tUrl):
    posts =[]
    from pyquery import PyQuery as pyq
    r = requests.get(tUrl)
    doc=pyq(r.text)
    list = doc("#content .post")
    for li in list:
        link = pyq(li).children("h2 a").attr("href")
        title =  pyq(li).children("h2 a").text()
        print "抓取文章(%s,link:%s)" %(title,link)
        ir = requests.get(link)
        idoc = pyq(ir.text)
        content = pyq(idoc(".post-content").children()[4]).remove("h2").remove(".STYLE1").html()
        content = content.replace("\"","\"\"");
        #print content
        post = Post()
        post.category = urllib.quote("创意") + ":创意"
        post.post_author = "geekzone"
        post.post_title = title
        post.post_content = "\""+content+"\""
        posts.append(post)
    return posts
        
if __name__ == '__main__':
    allposts = []
    for i in range(5):
        if i==0:
            continue
        print "第%s页" %i
        posts = getHtmlByPyquery("http://crege.net/page/%s" %i)
        allposts.extend(posts)
    p = Post2Csver("/home/lihan/桌面/1.csv")
    p.write(allposts)
    print "succ"