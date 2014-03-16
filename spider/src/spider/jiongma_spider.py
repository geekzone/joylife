#!/usr/bin/env python2
#encoding=utf-8
import StringIO
import pycurl
import re
import requests
import urllib

from component.post2csv import Post, Post2Csver


def getHtml(url):
    c = pycurl.Curl() #创建一个同libcurl中的CURL处理器相对应的Curl对象
    b = StringIO.StringIO()
    c.setopt(pycurl.USERAGENT, "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.1.4322)")
    c.setopt(pycurl.URL, url) #设置要访问的网址 url = "http://www.cnn.com"
    c.perform() #执行上述访问网址的操作
    print "HTTP-code:", c.getinfo(c.HTTP_CODE) #打印出 200(HTTP状态码)
    html = b.getvalue()
    print(html.decode("gbk").encode("utf-8"))
    b.close()
    c.close()

def getHtmlByPyquery(tUrl):
    posts =[]
    from pyquery import PyQuery as pyq
    r = requests.get(tUrl)
    doc=pyq(r.text)
    lis = doc(".car-monthlisting li a")
    lis = lis[0:100]
    lis.reverse()
    i=1
    for li in lis:
        link = pyq(li).attr("href")
        title =  pyq(li).text()
        print "抓取文章_%s(%s,link:%s)" %(i,title,link)
        ir = requests.get(link)
        idoc = pyq(ir.text)
        content = idoc("#content .entrybody").remove(".wumii-hook").remove("script").remove("ins").remove(".ds-thread").remove("#ds-ssr").remove("div").remove("#comments").html()
        content = content.replace("\"","\"\"");
        #print content
        post = Post()
        post.category = urllib.quote("notes") + ":段子"
        post.post_author = "geekzone"
        post.post_title = title
        post.post_content = "\""+content+"\""
        posts.append(post)
        i=i+1
    return posts
        
        
if __name__=="__main__":
    allposts = getHtmlByPyquery("http://dongde.in/archives/")
    p = Post2Csver("/home/lihan/桌面/dongde.csv")
    p.write(allposts)
    print "succ"