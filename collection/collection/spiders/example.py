import scrapy
from collection.items import CollectionItem


class ExampleSpider(scrapy.Spider):
    name = 'example'
    start_urls = 'https://store.sajhakitab.com/page/1/?s&post_type=product&product_cat=0'
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.pageno = 1

    def start_requests(self):       
        
        yield scrapy.Request(url=self.start_urls, callback=self.parse)

    def parse(self, response):
        
        for book in response.css('div.products'):
            title=book.css('h3.product-title a::text').extract()
            price=book.css('span.amount>bdi::text').extract()
            for item in zip(title,price):
                scraped_info = CollectionItem()
                scraped_info['name'] = item[0]
                try:
                    # convert to float if str
                    scraped_info['price'] = float(item[1])
                    yield scraped_info
                except ValueError:
                    pass
                
        if self.pageno <= 5:
            self.pageno += 1
            yield scrapy.Request(url='https://store.sajhakitab.com/page/{pageno}/?s&post_type=product&product_cat=0'.format(pageno=self.pageno), callback=self.parse)
                