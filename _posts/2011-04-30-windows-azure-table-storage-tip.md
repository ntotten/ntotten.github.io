---
date: '2011-04-30'
layout: post
title: Windows Azure Table Storage Tip
categories:
  - Windows Azure
redirect_from: /2011/04/windows-azure-table-storage-tip/
---

I have been using Windows Azure storage for quite a while now but I seem to learn something new about it every time I start a new project. Today, I learned about a very cool static method on CloudTableClient that will create your Windows Azure tables from your model. While not quite as easy to use as Entity Framework Code First, it is very close. This will be my new default way of using Table Storage.

So for this example we are going to have a simple table setup with Customers, Products, and Orders. The first thing we will need to do is create our data models.

Also, note that we are always setting the PartionKey on the entities to "_default". You will see this in both the entity constructors and the IQuerableproperties. It is important to note that when you do a query on table storage you ALWAYS should query with the partition key. For this example, we are assuming that we are only going to use a single partition. For most apps this is a perfectly acceptable assumtion to make. The only times you really need to use multiple partitions are when you want additional options for querying data or when you are operating at high scale (500+ requests per second to table storage).

```cs
public class CustomerEntity : TableServiceEntity {

  public CustomerEntity()
    : base("_default", null) {
  }

  public string FirstName { get; set; }
  public string LastName { get; set; }

}

public class ProductEntity : TableServiceEntity {

  public ProductEntity()
    : base("_default", null) {

  }

  public string Name { get; set; }
  public int Price { get; set; }

}

public class OrderEntity : TableServiceEntity {

  public OrderEntity()
    : base("_default", null) {

  }

  public string ProductRowkey { get; set; }
  public string CustomerRowKey { get; set; }

}
```

Next, we need a table context that contains our models.

```cs
public class TableStorageContext : TableServiceContext {

  private const string CustomersTable = "Customers";
  private const string ProductsTable = "Products";
  private const string OrdersTable = "Orders";

  public TableStorageContext(string baseAddress, StorageCredentials credentials)
    : base(baseAddress, credentials) {
  }

  public IQueryable<CustomerEntity> Customers {
    get {
      return this.CreateQuery(CustomersTable).Where(c => c.PartitionKey == "_default");
    }
  }

  public IQueryable<ProductEntity> Products {
    get {
      return this.CreateQuery(ProductsTable).Where(c => c.PartitionKey == "_default");
    }
  }

  public IQueryable<OrderEntity> Orders {
    get {
      return this.CreateQuery(OrdersTable).Where(c => c.PartitionKey == "_default");
    }
  }

  public void AddCustomer(CustomerEntity customer) {
    this.AddObject(CustomersTable, customer);
  }

  public void AddProduct(ProductEntity product) {
    this.AddObject(ProductsTable, product);
  }

  public void AddOrder(OrderEntity order) {
    this.AddObject(OrdersTable, order);
  }

}
```

And the last thing we do is call our new handy extension method to create our tables in Windows Azure storage. You would call this from your Azure role's OnStart method or in Application_Start your web app Global.asax file.

```cs
var account = CloudStorageAccount.FromConfigurationSetting("DataConnectionString");
CloudTableClient.CreateTablesFromModel(
  typeof(TableServiceContext),
  account.TableEndpoint.AbsoluteUri,
  account.Credentials);
```

This differs from what I have usually done, which is to call CreateIfNotExists for each table on the application startup. While these are techniques both accomplish the same thing, the above way just feels cleaner to me.

Now to use your table storage data context you just new up an instance and query like you would for Entity Framework or any other LINQ data provider.

```cs
var account = CloudStorageAccount.FromConfigurationSetting("DataConnectionString");
var context = new TableStorageContext(account.TableEndpoint.ToString(), account.Credentials);
var customer = context.Customers.SingleOrDefault(c => c.RowKey == "1234");
```

Table storage is a great tool when you don’t need relational data. It is extremely scalable, fast, and flexible and you can use it with any type of application even if you aren’t running on Windows Azure Compute.

Let me know how this works out for you.

