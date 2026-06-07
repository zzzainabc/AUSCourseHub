import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;

@WebServlet("/workspace")
public class WorkspaceServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String courseId = request.getParameter("course_id");
        String tab = request.getParameter("tab");
        boolean gradesActive = "grades".equals(tab);

        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        try (Connection conn = DBConnection.getConnection()) {

            PreparedStatement coursePs = conn.prepareStatement(
                    "SELECT * FROM courses WHERE course_id = ?"
            );
            coursePs.setInt(1, Integer.parseInt(courseId));

            ResultSet courseRs = coursePs.executeQuery();

            String code = "";
            String name = "";
            String semester = "";
            String instructor = "";

            if (courseRs.next()) {
                code = courseRs.getString("course_code");
                name = courseRs.getString("course_name");
                semester = courseRs.getString("semester");
                instructor = courseRs.getString("instructor");
            }

            out.println("<!DOCTYPE html>");
            out.println("<html lang='en'>");

            out.println("<head>");
            out.println("<meta charset='UTF-8'>");
            out.println("<title>Workspace</title>");
            out.println("<link href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css' rel='stylesheet'>");
            out.println("<link rel='stylesheet' href='workspace.css'>");
            out.println("</head>");

            out.println("<body>");

            out.println("<header class='topbar'>");
            out.println("<div class='uni-name'>American University of Sharjah</div>");
            out.println("</header>");

            out.println("<main class='container'>");

            out.println("<a href='SidebarServlet?page=CoursesMain' class='back-link'>← Back to Courses</a>");
            
            out.println("<section class='course-hero'>");
            out.println("<div class='hero-tags'>");
            out.println("<span class='course-code'>" + code + "</span>");
            out.println("<span class='course-semester'>" + semester + "</span>");
            out.println("</div>");
            out.println("<h1>" + name + "</h1>");
            out.println("<p>🎓 " + instructor + "</p>");
            out.println("</section>");

            out.println("<div class='tabs'>");

            if (gradesActive) {
                out.println("<div class='tab' onclick='showTasks()'>Tasks & Assignments</div>");
                out.println("<div class='tab active' onclick='showGrades()'>Grades & Performance</div>");
            } else {
                out.println("<div class='tab active' onclick='showTasks()'>Tasks & Assignments</div>");
                out.println("<div class='tab' onclick='showGrades()'>Grades & Performance</div>");
            }

            out.println("</div>");

            /* TASKS SECTION */
            if (gradesActive) {
                out.println("<div id='tasksSection' style='display: none;'>");
            } else {
                out.println("<div id='tasksSection'>");
            }

            out.println("<section class='section-header'>");
            out.println("<h2>Tasks & Assignments</h2>");
            out.println("<button class='add-btn' onclick='openTaskForm()'>+ Task</button>");
            out.println("</section>");

            PreparedStatement taskPs = conn.prepareStatement(
                    "SELECT * FROM tasks WHERE course_id = ?"
            );
            taskPs.setInt(1, Integer.parseInt(courseId));

            ResultSet taskRs = taskPs.executeQuery();

            boolean hasTasks = false;

            out.println("<div id='taskList'>");

            while (taskRs.next()) {
                hasTasks = true;

                int taskId = taskRs.getInt("task_id");
                String taskName = taskRs.getString("task_name");
                String dueDate = taskRs.getString("due_date");
                boolean completed = taskRs.getBoolean("completed");

                String completedClass = "";
                String checked = "";

                if (completed) {
                    completedClass = " completed";
                    checked = " checked";
                }

                out.println("<div class='task-card" + completedClass + "'>");

                out.println("<div class='task-left'>");

                out.println("<form action='toggleTask' method='post'>");
                out.println("<input type='hidden' name='task_id' value='" + taskId + "'>");
                out.println("<input type='hidden' name='course_id' value='" + courseId + "'>");
                out.println("<input class='task-checkbox' type='checkbox'" + checked + ">");
                out.println("</form>");

                out.println("<div class='task-text'>");
                out.println("<div class='task-title'>" + taskName + "</div>");
                out.println("<div class='task-date'>Due: " + dueDate + "</div>");
                out.println("</div>");

                out.println("</div>");

                out.println("<form action='deleteTask' method='post'>");
                out.println("<input type='hidden' name='task_id' value='" + taskId + "'>");
                out.println("<input type='hidden' name='course_id' value='" + courseId + "'>");
                out.println("<button class='delete-task-btn' type='submit'>Delete</button>");
                out.println("</form>");

                out.println("</div>");
            }

            out.println("</div>");

            if (!hasTasks) {
                out.println("<section class='empty-box' id='tasksEmptyBox'>");
                out.println("<div class='empty-content'>");
                out.println("<div class='circle'></div>");
                out.println("<p>No assignments yet.</p>");
                out.println("</div>");
                out.println("</section>");
            }

            out.println("</div>");

            /* GRADES SECTION */
            if (gradesActive) {
                out.println("<div id='gradesSection'>");
            } else {
                out.println("<div id='gradesSection' style='display: none;'>");
            }

            PreparedStatement gradePs = conn.prepareStatement(
                    "SELECT * FROM grades WHERE course_id = ?"
            );
            gradePs.setInt(1, Integer.parseInt(courseId));

            ResultSet gradeRs = gradePs.executeQuery();

            double totalGrade = 0;
            double totalWeight = 0;
            boolean hasGrades = false;

            String gradeRows = "";

            while (gradeRs.next()) {
                hasGrades = true;

                String gradeName = gradeRs.getString("name");
                double grade = gradeRs.getDouble("grade");
                double weight = gradeRs.getDouble("weight");

                totalGrade = totalGrade + grade;
                totalWeight = totalWeight + weight;

                double percent = 0;

                if (weight != 0) {
                    percent = (grade / weight) * 100;
                }

                int gradeId = gradeRs.getInt("grade_id");

                gradeRows = gradeRows +
                        "<div class='table-row'>" +

                        "<div>" + gradeName + "</div>" +
                        "<div>" + weight + "%</div>" +
                        "<div>" + grade + "</div>" +
                        "<div>" + getLetterGrade(percent) + "</div>" +

                        "<div>" +
                        "<form action='deleteGrade' method='post'>" +
                        "<input type='hidden' name='grade_id' value='" + gradeId + "'>" +
                        "<input type='hidden' name='course_id' value='" + courseId + "'>" +
                        "<button type='submit' class='delete-task-btn'>Delete</button>" +
                        "</form>" +
                        "</div>" +

                        "</div>";
            }

            String averageText = "N/A";
            String letterText = "-";

            if (totalWeight != 0) {
                double average = (totalGrade / totalWeight) * 100;
                averageText = String.format("%.1f", average);
                letterText = getLetterGrade(average);
            }

            out.println("<div class='grades-wrapper'>");

            out.println("<div class='grade-main'>");
            out.println("<p>Current Grade Average</p>");
            out.println("<h1 id='gradeAverage'>" + averageText + "</h1>");
            out.println("<span class='grade-dash' id='letterGrade'>" + letterText + "</span>");
            out.println("</div>");

            out.println("<div class='grade-scale'>");
            out.println("<h3>Grade Scale</h3>");

            out.println("<div class='row g-3 mt-2'>");
            out.println("<div class='col-md-4'><div class='scale-box'>A<br><span>93+</span></div></div>");
            out.println("<div class='col-md-4'><div class='scale-box'>A-<br><span>90+</span></div></div>");
            out.println("<div class='col-md-4'><div class='scale-box'>B+<br><span>87+</span></div></div>");
            out.println("<div class='col-md-4'><div class='scale-box'>B<br><span>83+</span></div></div>");
            out.println("<div class='col-md-4'><div class='scale-box'>B-<br><span>80+</span></div></div>");
            out.println("<div class='col-md-4'><div class='scale-box'>C+<br><span>77+</span></div></div>");
            out.println("<div class='col-md-4'><div class='scale-box'>C<br><span>73+</span></div></div>");
            out.println("<div class='col-md-4'><div class='scale-box'>D<br><span>60+</span></div></div>");
            out.println("<div class='col-md-4'><div class='scale-box'>F<br><span>&lt;60</span></div></div>");
            out.println("</div>");

            out.println("</div>");
            out.println("</div>");

            out.println("<section class='section-header'>");
            out.println("<h2>Grades</h2>");
            out.println("<button class='add-btn' onclick='openGradeForm()'>+ Add Grade</button>");
            out.println("</section>");

            out.println("<div class='assignment-table'>");

            out.println("<div class='table-header'>");
            out.println("<div>Name</div>");
            out.println("<div>Weight</div>");
            out.println("<div>Grade</div>");
            out.println("<div>Letter</div>");
            out.println("</div>");

            out.println("<div id='gradesTableBody'>");

            if (hasGrades) {
                out.println(gradeRows);
            } else {
                out.println("<div class='table-empty'>No grades added yet.</div>");
            }

            out.println("</div>");
            out.println("</div>");

            out.println("</div>");

            out.println("</main>");

            /* TASK POPUP */
            out.println("<div class='form-page' id='taskFormPopup'>");
            out.println("<div class='form-card'>");

            out.println("<h2 class='form-title'>Add New Task</h2>");

            out.println("<form id='taskForm' action='addTask' method='post'>");
            out.println("<input type='hidden' name='course_id' value='" + courseId + "'>");

            out.println("<label>Assignment Name</label>");
            out.println("<input type='text' name='taskName' required>");

            out.println("<label>Due Date</label>");
            out.println("<input type='date' name='taskDueDate' required>");

            out.println("<div class='form-buttons'>");
            out.println("<button type='button' class='cancel-btn' onclick='closeTaskForm()'>Cancel</button>");
            out.println("<button type='submit' class='save-btn'>Save Task</button>");
            out.println("</div>");

            out.println("</form>");

            out.println("</div>");
            out.println("</div>");

            /* GRADE POPUP */
            out.println("<div class='form-page' id='gradeFormPopup'>");
            out.println("<div class='form-card'>");

            out.println("<h2 class='form-title'>Add Grade</h2>");

            out.println("<form id='gradeForm' action='addGrade' method='post'>");
            out.println("<input type='hidden' name='course_id' value='" + courseId + "'>");

            out.println("<label>Name</label>");
            out.println("<input type='text' name='name' required>");

            out.println("<label>Grade</label>");
            out.println("<input type='number' name='grade' required>");

            out.println("<label>Weight</label>");
            out.println("<input type='number' name='weight' required>");

            out.println("<div class='form-buttons'>");
            out.println("<button type='button' class='cancel-btn' onclick='closeGradeForm()'>Cancel</button>");
            out.println("<button type='submit' class='save-btn'>Save Grade</button>");
            out.println("</div>");

            out.println("</form>");

            out.println("</div>");
            out.println("</div>");

            out.println("<script src='workspace.js'></script>");

            out.println("</body>");
            out.println("</html>");

            gradeRs.close();
            gradePs.close();

            taskRs.close();
            taskPs.close();

            courseRs.close();
            coursePs.close();

            conn.close();

        } catch (Exception e) {
            out.println("Error loading workspace: " + e.getMessage());
        }
    }

    private String getLetterGrade(double average) {
        if (average >= 93) {
            return "A";
        } else if (average >= 90) {
            return "A-";
        } else if (average >= 87) {
            return "B+";
        } else if (average >= 83) {
            return "B";
        } else if (average >= 80) {
            return "B-";
        } else if (average >= 77) {
            return "C+";
        } else if (average >= 73) {
            return "C";
        } else if (average >= 60) {
            return "D";
        } else {
            return "F";
        }
    }
}
