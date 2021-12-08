using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace DolceVita_task.Controllers
{
    public class TaskController : ApiController
    {

        public Dolce_vitaDBEntities DBC = new Dolce_vitaDBEntities();


        //Get tasks list
        public List<task_tbl> GetTasksList()
        {

            List<task_tbl> tskList = new List<task_tbl>();
            tskList = DBC.task_tbl.ToList();
            return tskList;

        }

        //Add new Client

        [HttpPost]
        public void Post_new_task([FromBody] task_tbl new_task)
        {

            if (new_task != null)
            {
                var ts = DBC.task_tbl.Where(t => t.TaskId == new_task.TaskId).FirstOrDefault();
                if (ts != null)
                {
                    ts.d_Date = new_task.d_Date;
                    ts.Status = new_task.Status;
                    ts.Content_task = new_task.Content_task;
                    DBC.SaveChanges();
                }
                else
                {
                    DBC.task_tbl.Add(new_task);
                    DBC.SaveChanges();
                }

            }
     
        }



        //Remove task
        [HttpPut]
        public List<task_tbl> PutClient(task_tbl t)
        {
            List<task_tbl> tskList = new List<task_tbl>();

            task_tbl cl = DBC.task_tbl.Where(x => x.TaskId.Equals(t.TaskId)).FirstOrDefault();

            if (cl == null)
            {
                tskList = this.GetTasksList();
                return tskList;
            }

            DBC.task_tbl.Remove(cl);
            DBC.SaveChanges();

            tskList = this.GetTasksList();
            return tskList;

        }






    }
}
