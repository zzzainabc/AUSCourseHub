import jakarta.servlet.*;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;
import java.io.*;
import java.sql.*;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@WebServlet("/UsersServlet")
public class UsersServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession(false);

        String userName = null;
        String userId = null;

        if (session != null) {
            userName = (String) session.getAttribute("userName");
            userId = (String) session.getAttribute("userId");
        }

        if (userName == null || userId == null) {
            response.sendRedirect("login.html");
            return;
        }

        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        String upcomingTasksHtml = buildUpcomingTasksHtml(userId);

        try (InputStream is = getServletContext().getResourceAsStream("/homepage.html");
             BufferedReader br = new BufferedReader(new InputStreamReader(is))) {

            if (is != null) {
                String line;
                while ((line = br.readLine()) != null) {
                    line = line.replace("Dana Dghaym", userName);
                    line = line.replace("HELLO, Dana!", "HELLO, " + userName + "!");
                    line = line.replace("{{UPCOMING_TASKS}}", upcomingTasksHtml);
                    out.println(line);
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private String buildUpcomingTasksHtml(String userId) {
        StringBuilder html = new StringBuilder();

        try (Connection conn = DBConnection.getConnection()) {
            String sql = """
                SELECT t.task_name, t.due_date, c.course_name
                FROM tasks t
                JOIN courses c ON t.course_id = c.course_id
                WHERE c.user_id = ?
                  AND t.completed = FALSE
                  AND t.due_date IS NOT NULL
                ORDER BY t.due_date ASC
                LIMIT 4
            """;

            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, userId);
            ResultSet rs = ps.executeQuery();

            boolean hasTasks = false;
            LocalDate today = LocalDate.now();

            while (rs.next()) {
                hasTasks = true;

                String taskName = rs.getString("task_name");
                String courseName = rs.getString("course_name");
                Date dueDateSql = rs.getDate("due_date");

                LocalDate dueDate = dueDateSql.toLocalDate();
                long daysLeft = ChronoUnit.DAYS.between(today, dueDate);

                String timeText;
                if (daysLeft < 0) {
                    timeText = "Passed";
                } else if (daysLeft == 0) {
                    timeText = "Today";
                } else if (daysLeft == 1) {
                    timeText = "1 day";
                } else if (daysLeft < 7) {
                    timeText = daysLeft + " days";
                } else if (daysLeft < 14) {
                    timeText = "1 week";
                } else if (daysLeft < 21) {
                    timeText = "2 weeks";
                } else if (daysLeft < 28) {
                    timeText = "3 weeks";
                } else {
                    timeText = "1+ month";
                }

                html.append("<div class='event-item d-flex justify-content-between'>")
                    .append("<div><i class='bi bi-journal-check me-2 text-primary'></i><strong>")
                    .append(escapeHtml(taskName))
                    .append("</strong><br><small class='text-muted'>")
                    .append(escapeHtml(courseName))
                    .append(" · Due ")
                    .append(dueDate)
                    .append("</small></div>")
                    .append("<span class='event-time'>")
                    .append(timeText)
                    .append("</span>")
                    .append("</div>");
            }

            if (!hasTasks) {
                html.append("<div class='event-item d-flex justify-content-between'>")
                    .append("<div><i class='bi bi-journal-check me-2 text-primary'></i><strong>No upcoming tasks</strong><br>")
                    .append("<small class='text-muted'>Add tasks in your course workspaces to see them here.</small></div>")
                    .append("<span class='event-time'>-</span>")
                    .append("</div>");
            }

        } catch (Exception e) {
            e.printStackTrace();
            html.append("<div class='event-item d-flex justify-content-between'>")
                .append("<div><strong>Could not load upcoming tasks.</strong></div>")
                .append("<span class='event-time'>-</span>")
                .append("</div>");
        }

        return html.toString();
    }

    private String escapeHtml(String text) {
        if (text == null) return "";
        return text.replace("&", "&amp;")
                   .replace("<", "&lt;")
                   .replace(">", "&gt;")
                   .replace("\"", "&quot;")
                   .replace("'", "&#39;");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getParameter("action");
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        String fullName = request.getParameter("fullName");
        String ausId = request.getParameter("id");

        try (Connection conn = DBConnection.getConnection()) {
            if ("signup".equals(action)) {
                String sql = "INSERT INTO Users (id, name, email, password) VALUES (?, ?, ?, ?)";
                try (PreparedStatement ps = conn.prepareStatement(sql)) {
                    ps.setString(1, ausId);
                    ps.setString(2, fullName);
                    ps.setString(3, email);
                    ps.setString(4, password);
                    ps.executeUpdate();

                    response.sendRedirect("login.html?status=success");
                    return;
                } catch (SQLException e) {
                    response.sendRedirect("login.html?error=exists");
                    return;
                }
            } else if ("login".equals(action)) {
                String sql = "SELECT id, name FROM Users WHERE email=? AND password=?";
                PreparedStatement ps = conn.prepareStatement(sql);
                ps.setString(1, email);
                ps.setString(2, password);
                ResultSet rs = ps.executeQuery();

                if (rs.next()) {
                    HttpSession session = request.getSession();
                    session.setAttribute("userName", rs.getString("name"));
                    session.setAttribute("userId", rs.getString("id"));
                    response.sendRedirect("UsersServlet");
                } else {
                    response.sendRedirect("login.html?error=invalid");
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}