#encoding=utf-8
'''
Created on 2014年3月16日

@author: lihan



'''
import datetime


class Post():
    
    def __init__(self):
        self.post_date = None
        self.post_status="publish"
        self.post_title= None
        self.post_author=None
        self.category=None
        self.post_content = None
        
        
class Post2Csver():
    
    def __init__(self,filename):
        self.filename= filename
        
    def write(self,posts):
        list = []
        title ="post_date,post_status,post_title,post_content,post_author,category"
        list.append(title)
        for post in posts:
            dt = datetime.datetime.now()
            post.post_date = dt.strftime('%Y-%m%-d %h:%M:%s')
            line = "%s,%s,%s,%s,%s,%s" %(post.post_date,post.post_status,post.post_title,post.post_content,post.post_author,post.category)
            list.append(line)
        content = "\n ".join(list)
        
        file_object = open(self.filename, 'w')
        file_object.write(content)
        file_object.close()
            
            


if __name__ == '__main__':
    post = Post()
    post.post_title="afds"
    post.post_content="fsdfsdfs"
    post.post_author="test"
    posts =[]
    posts.append(post)
    
    p = Post2Csver("1.csv")
    p.write(posts)